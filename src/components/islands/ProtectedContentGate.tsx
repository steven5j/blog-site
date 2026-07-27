import { useCallback, useEffect, useId, useState } from 'react';

type Props = {
  slug: string;
  mode?: 'embed' | 'page';
  standaloneUrl?: string;
};

type UnlockResponse = {
  unlocked?: boolean;
  title?: string;
  html?: string;
  error?: string;
};

export default function ProtectedContentGate({
  slug,
  mode = 'embed',
  standaloneUrl,
}: Props) {
  const formId = useId();
  const [password, setPassword] = useState('');
  const [html, setHtml] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const applyResponse = useCallback((data: UnlockResponse) => {
    if (data.unlocked && data.html) {
      setHtml(data.html);
      setTitle(data.title ?? null);
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
          setError('無法連線至解鎖服務（本機開發請使用 wrangler pages dev）。');
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
        setError(data.error ?? '解鎖失敗');
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
      <section className="protected-gate protected-gate--unlocked" aria-live="polite">
        {title && mode === 'page' && (
          <h2 className="protected-gate__unlocked-title font-display text-2xl font-semibold text-ink">
            {title}
          </h2>
        )}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    );
  }

  return (
    <section
      className={`protected-gate protected-gate--${mode}`}
      aria-labelledby={`${formId}-label`}
    >
      <div className="protected-gate__panel">
        <p className="protected-gate__eyebrow">Protected Content</p>
        <h2 id={`${formId}-label`} className="protected-gate__title font-display">
          {mode === 'page' ? '此內容需要密碼' : '機密細節（密碼解鎖）'}
        </h2>
        <p className="protected-gate__hint">
          輸入密碼以檢視公司機密補充內容。解鎖後 24 小時內無需重複輸入。
        </p>

        <form className="protected-gate__form" onSubmit={handleSubmit}>
          <label className="protected-gate__label" htmlFor={`${formId}-password`}>
            密碼
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
            {submitting ? '驗證中…' : '解鎖內容'}
          </button>
        </form>

        {error && (
          <p className="protected-gate__error" role="alert">
            {error}
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
