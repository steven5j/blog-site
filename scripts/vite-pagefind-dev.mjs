/**
 * Serve dist/pagefind/* during `astro dev` so search works after a prior build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pagefindDir = path.resolve(root, 'dist', 'pagefind');

const MIME = {
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.wasm': 'application/wasm',
  '.json': 'application/json; charset=utf-8',
};

export function pagefindDev() {
  return {
    name: 'pagefind-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split('?')[0] ?? '';
        if (!raw.startsWith('/pagefind/')) return next();

        const rel = decodeURIComponent(raw.slice('/pagefind/'.length));
        if (!rel || rel.includes('..') || path.isAbsolute(rel)) {
          res.statusCode = 400;
          res.end('Bad request');
          return;
        }

        const file = path.resolve(pagefindDir, rel);
        const dirWithSep = pagefindDir.endsWith(path.sep)
          ? pagefindDir
          : `${pagefindDir}${path.sep}`;
        if (file !== pagefindDir && !file.startsWith(dirWithSep)) {
          res.statusCode = 403;
          res.end('Forbidden');
          return;
        }

        let stat;
        try {
          stat = fs.statSync(file);
        } catch {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Pagefind index missing. Run npm run build once to generate it.');
          return;
        }
        if (!stat.isFile()) {
          res.statusCode = 404;
          res.end('Not found');
          return;
        }

        const ext = path.extname(file);
        res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream');
        res.setHeader('Cache-Control', 'no-store');
        fs.createReadStream(file).pipe(res);
      });
    },
  };
}
