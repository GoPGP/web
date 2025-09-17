#!/usr/bin/env node
/**
 * Visual regression check for the gopgp.org landing page.
 *
 * Captures screenshots at fixed viewport states, compares each against a
 * committed baseline PNG, and writes a diff PNG when pixels differ.
 *
 * Prerequisites (no driver baked in — keeps the script lean):
 *   1) Chrome listening on http://localhost:9222
 *      (see .claude/skills/gopgp-debug-loop/SKILL.md for the exact launch)
 *   2) Dev server running on http://localhost:3000 (`npm run dev`)
 *
 * Modes:
 *   node scripts/visual-check.mjs              # compare against baselines
 *   node scripts/visual-check.mjs --update     # overwrite baselines
 *
 * Exit codes:
 *   0 — all states within threshold
 *   1 — at least one state diff exceeded threshold
 *   2 — environment problem (Chrome/dev not reachable)
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(__dirname, '..')
const BASELINES = path.join(REPO, 'tests/visual/baselines')
const DIFFS = path.join(REPO, 'tests/visual/diffs')
const CDP_HTTP = 'http://localhost:9222'
const TARGET_URL_PREFIX = 'http://localhost:3000'

// Pixel-diff threshold: fraction of mismatched pixels above which a state fails.
// Anti-aliasing alone can produce ~0.1%; we set 0.5% to absorb font-render noise.
const FAIL_THRESHOLD = 0.005

const STATES = [
  { name: 'top',         scrollY: 0    },
  { name: 'scrolled-1k', scrollY: 1000 },
  { name: 'mid',         scrollY: 2400 },
  { name: 'footer',      scrollY: 999999 },
]

const VIEWPORT = { width: 1280, height: 800 }

const update = process.argv.includes('--update')

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`)
  return res.json()
}

async function pickTab() {
  let list
  try {
    list = await fetchJson(`${CDP_HTTP}/json/list`)
  } catch (e) {
    console.error(`✗ Chrome CDP not reachable at ${CDP_HTTP}: ${e.message}`)
    console.error('  Start Chrome with --remote-debugging-port=9222 (see gopgp-debug-loop SKILL.md).')
    process.exit(2)
  }
  const tab = list.find(
    (t) => t.type === 'page' && (t.url || '').startsWith(TARGET_URL_PREFIX),
  )
  if (!tab) {
    console.error(`✗ No tab found on ${TARGET_URL_PREFIX}.`)
    console.error('  Start the dev server (npm run dev) and open it in the debug-Chrome.')
    process.exit(2)
  }
  return tab
}

async function verifyDevUp() {
  try {
    const r = await fetch(TARGET_URL_PREFIX, { redirect: 'manual' })
    if (!r.ok && r.status !== 304) throw new Error(`status ${r.status}`)
  } catch (e) {
    console.error(`✗ Dev server not reachable at ${TARGET_URL_PREFIX}: ${e.message}`)
    process.exit(2)
  }
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl)
    this.id = 0
    this.pending = new Map()
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener('open', () => resolve())
      this.ws.addEventListener('error', (e) => reject(e))
    })
    this.ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data)
      if (msg.id != null && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        if (msg.error) reject(new Error(`${msg.error.code} ${msg.error.message}`))
        else resolve(msg.result)
      }
    })
  }
  send(method, params = {}) {
    const id = ++this.id
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }
  close() { this.ws.close() }
}

async function evalJs(client, expr) {
  const r = await client.send('Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
    awaitPromise: true,
  })
  if (r.exceptionDetails) {
    throw new Error(`JS exception: ${r.exceptionDetails.text}`)
  }
  return r.result.value
}

async function setViewport(client, { width, height }) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  })
}

async function captureState(client, state) {
  await evalJs(client, `window.scrollTo({ top: ${state.scrollY}, behavior: 'instant' })`)
  await evalJs(client, 'new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))')
  await new Promise((r) => setTimeout(r, 250))
  const { data } = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  })
  return Buffer.from(data, 'base64')
}

async function readPng(buf) {
  return new Promise((resolve, reject) => {
    new PNG().parse(buf, (err, data) => (err ? reject(err) : resolve(data)))
  })
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

async function main() {
  await ensureDir(BASELINES)
  await ensureDir(DIFFS)
  await verifyDevUp()
  const tab = await pickTab()
  const client = new CdpClient(tab.webSocketDebuggerUrl)
  await client.ready
  await client.send('Page.enable')
  await setViewport(client, VIEWPORT)

  const failures = []
  const ok = []

  for (const state of STATES) {
    const baselinePath = path.join(BASELINES, `${state.name}.png`)
    const diffPath = path.join(DIFFS, `${state.name}.diff.png`)
    const currentPath = path.join(DIFFS, `${state.name}.current.png`)

    const buf = await captureState(client, state)
    await fs.writeFile(currentPath, buf)

    let baseline
    try {
      baseline = await fs.readFile(baselinePath)
    } catch {
      if (update) {
        await fs.writeFile(baselinePath, buf)
        ok.push(`+ ${state.name}: baseline created`)
        continue
      }
      failures.push(`✗ ${state.name}: missing baseline (run with --update to seed)`)
      continue
    }

    if (update) {
      await fs.writeFile(baselinePath, buf)
      ok.push(`↻ ${state.name}: baseline updated`)
      continue
    }

    const a = await readPng(baseline)
    const b = await readPng(buf)
    if (a.width !== b.width || a.height !== b.height) {
      failures.push(`✗ ${state.name}: size mismatch (baseline ${a.width}x${a.height} vs current ${b.width}x${b.height})`)
      continue
    }
    const diff = new PNG({ width: a.width, height: a.height })
    const mismatch = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
      threshold: 0.1,
      includeAA: false,
    })
    const ratio = mismatch / (a.width * a.height)
    if (ratio > FAIL_THRESHOLD) {
      await fs.writeFile(diffPath, PNG.sync.write(diff))
      failures.push(
        `✗ ${state.name}: ${(ratio * 100).toFixed(2)}% pixels differ (${mismatch} px) — diff: ${path.relative(REPO, diffPath)}`,
      )
    } else {
      ok.push(`✓ ${state.name}: ${(ratio * 100).toFixed(3)}% diff`)
    }
  }

  client.close()

  for (const line of ok) console.log(line)
  for (const line of failures) console.error(line)
  console.log(`\n${ok.length} ok, ${failures.length} failed`)
  process.exit(failures.length ? 1 : 0)
}

main().catch((e) => {
  console.error(e.stack || e)
  process.exit(2)
})
