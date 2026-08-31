const CJK =
  /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u;

/**
 * Align browser queries with Pagefind's CJK n-gram index.
 * ASCII tokens stay intact; consecutive Han characters become overlapping bigrams.
 */
export function tokenizeSearchQuery(input: string): string {
  const terms: string[] = [];
  let ascii = '';
  let cjk = '';

  const flushAscii = () => {
    if (ascii) {
      terms.push(ascii);
      ascii = '';
    }
  };

  const flushCjk = () => {
    if (!cjk) return;
    if (cjk.length === 1) terms.push(cjk);
    else {
      for (let i = 0; i < cjk.length - 1; i += 1) {
        terms.push(cjk.slice(i, i + 2));
      }
    }
    cjk = '';
  };

  for (const ch of input.normalize('NFKC')) {
    if (/\s/u.test(ch)) {
      flushAscii();
      flushCjk();
      continue;
    }
    if (CJK.test(ch)) {
      flushAscii();
      cjk += ch;
    } else {
      flushCjk();
      ascii += ch;
    }
  }
  flushAscii();
  flushCjk();
  return terms.join(' ');
}

export function isSearchShortcutTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}
