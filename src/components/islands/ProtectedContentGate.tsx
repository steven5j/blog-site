import { useCallback, useEffect, useId, useRef, useState } from 'react';

type Props = {
  slug: string;
  mode?: 'embed' | 'page';
  standaloneUrl?: string;
  publicPostUrl?: string;
};

type UnlockResponse = {
  unlocked?: boolean;
  title?: string;
  html?: string;
  error?: string;
};

function extractBodyHtml(html: string) {
  const wrapped = html.match(
    /^<div class="prose-blog protected-body">([\s\S]*)<\/div>\s*$/,
  );
  return wrapped ? wrapped[1] : html;
}

export default function ProtectedContentGate({
  slug,
  mode = 'embed',
  standaloneUrl,
  publicPostUrl,
}: Props) {
  const formId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const [password, setPassword] = useState('');
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const applyResponse = useCallback((data: UnlockResponse) => {
    if (data.unlocked && data.html) {
      setHtml(extractBodyHtml(data.html));
      setError(null);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const res = await fetch(`/api/unlock?slug=${encodeURIComponent(slug)}`, {
          credentials: 'same-origin',
        });
        if (cancelled) return;
        if (res.ok) {
          const data = (await res.json()) as UnlockResponse;
          applyResponse(data);
        }
      } catch {
        if (!cancelled) {
          setError(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void checkSession();
    return () => {
      cancelled = true;
    };
  }, [slug, applyResponse]);

  useEffect(() => {
    if (!html) return;
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [html]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, password }),
      });
      const data = (await res.json()) as UnlockResponse;
      if (!res.ok) {
        setError(data.error ?? '密碼錯誤，請再試一次。');
        return;
      }
      applyResponse({ unlocked: true, ...data });
      setPassword('');
    } catch {
      setError('無法連線至解鎖服務。');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="protected-gate protected-gate--loading" aria-live="polite">
        正在檢查存取權限…
      </div>
    );
  }

  if (html) {
    return (
      <div
        ref={contentRef}
        id="protected-content-start"
        className="protected-body"
        aria-live="polite"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <section
      className={`protected-gate protected-gate--${mode}`}
      aria-labelledby={`${formId}-label`}
    >
      <div className="protected-gate__panel">
        {mode === 'page' ? (
          <p id={`${formId}-label`} className="protected-gate__hint protected-gate__hint--page">
            這篇內容受到密碼保護。如需檢視內容，請於下方欄位輸入密碼：
          </p>
        ) : (
          <>
            <p className="protected-gate__eyebrow">Protected Content</p>
            <h3 id={`${formId}-label`} className="protected-gate__title font-display">
              機密細節（密碼解鎖）
            </h3>
            <p className="protected-gate__hint">
              輸入密碼以檢視公司機密補充內容。解鎖後 24 小時內無需重複輸入。
            </p>
          </>
        )}

        <form className="protected-gate__form" onSubmit={handleSubmit}>
          <label className="protected-gate__label" htmlFor={`${formId}-password`}>
            密碼：
          </label>
          <input
            id={`${formId}-password`}
            className="protected-gate__input"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
            required
          />
          <button className="protected-gate__submit" type="submit" disabled={submitting}>
            {submitting ? '驗證中…' : mode === 'page' ? '送出' : '解鎖內容'}
          </button>
        </form>

        {error && (
          <p className="protected-gate__error" role="alert">
            {error}
          </p>
        )}

        {mode === 'page' && publicPostUrl && (
          <p className="protected-gate__footer">
            公開摘要請見
            <a href={publicPostUrl} className="protected-gate__link">
              送報件資料修正輔助系統
            </a>
            。
          </p>
        )}

        {mode === 'embed' && standaloneUrl && (
          <p className="protected-gate__footer">
            亦可前往
            <a href={standaloneUrl} className="protected-gate__link">
              獨立機密頁
            </a>
            檢視。
          </p>
        )}
      </div>
    </section>
  );
}
