import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createUnlockHandler } from '../lib/protected-unlock.mjs';
import { buildProtectedManifest } from './prepare-protected.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function loadDevEnv() {
  const env = { ...process.env };
  const devVarsPath = path.join(root, '.dev.vars');
  if (!fs.existsSync(devVarsPath)) return env;

  for (const line of fs.readFileSync(devVarsPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    env[key] = value;
  }
  return env;
}

function loadManifest() {
  try {
    return buildProtectedManifest();
  } catch (err) {
    console.warn('[protected-api] Failed to build manifest:', err);
    const manifestPath = path.join(root, 'functions', '_data', 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }
    return {};
  }
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function sendResponse(res, response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      res.appendHeader('Set-Cookie', value);
    } else {
      res.setHeader(key, value);
    }
  });
  const body = await response.text();
  res.end(body);
}

/** Vite plugin: serve /api/unlock during `astro dev` using .dev.vars */
export function protectedUnlockApi() {
  const env = loadDevEnv();

  return {
    name: 'protected-unlock-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        if (url.pathname !== '/api/unlock') return next();

        try {
          const handleUnlock = createUnlockHandler(loadManifest());
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const v of value) headers.append(key, v);
            } else {
              headers.set(key, value);
            }
          }

          let body;
          if (req.method === 'POST') {
            body = await readRequestBody(req);
          }

          const request = new Request(url.toString(), {
            method: req.method,
            headers,
            body: body?.length ? body : undefined,
          });

          const response = await handleUnlock(request, env);
          await sendResponse(res, response);
        } catch (err) {
          console.error('[protected-api]', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: '伺服器錯誤' }));
        }
      });
    },
  };
}
