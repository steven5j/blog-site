import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const panels = [
  {
    eyebrow: '01',
    title: '靜態為骨',
    body: '內容以 HTML 輸出，閱讀頁保持極輕。部署到邊緣網路，首屏幾乎不帶框架稅。',
  },
  {
    eyebrow: '02',
    title: 'Islands 為肌',
    body: '只有需要互動的區塊才 hydrate。GSAP、Lottie 關在島上，其餘頁面維持安靜。',
  },
  {
    eyebrow: '03',
    title: '敘事為魂',
    body: '旗艦頁用 ScrollTrigger 把理念捲成一段旅程——這正是你現在看到的體驗。',
  },
] as const;

export default function GsapShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>('[data-stage]');
      const progress = root.querySelector<HTMLElement>('[data-progress]');

      stages.forEach((stage, index) => {
        gsap.fromTo(
          stage,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top 75%',
              end: 'top 35%',
              scrub: true,
            },
          },
        );

        ScrollTrigger.create({
          trigger: stage,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => progress?.style.setProperty('--p', String((index + 1) / stages.length)),
          onEnterBack: () =>
            progress?.style.setProperty('--p', String((index + 1) / stages.length)),
        });
      });

      const pinTarget = root.querySelector<HTMLElement>('[data-pin]');
      if (pinTarget) {
        gsap.to(pinTarget.querySelector('[data-pin-copy]'), {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: pinTarget,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: true,
          },
        });
      }
    }, root);

    const killAll = () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };

    document.addEventListener('astro:before-swap', killAll);

    return () => {
      document.removeEventListener('astro:before-swap', killAll);
      killAll();
    };
  }, [reduceMotion]);

  return (
    <div ref={rootRef} className="relative">
      <section className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center px-6 py-24">
        <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[#3db8a8] uppercase">
          Showcase
        </p>
        <h1 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          把網站做成一段可捲動的主張
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[#8b9bb0]">
          {reduceMotion
            ? '已依系統設定關閉滾動動畫，以下以靜態方式呈現內容。'
            : '向下捲動，看靜態架構如何與動畫 islands 並存。'}
        </p>
        <div
          data-progress
          className="mt-10 h-1 w-40 overflow-hidden rounded-full bg-white/10"
          style={{ ['--p' as string]: 0 }}
          aria-hidden="true"
        >
          <div
            className="h-full origin-left bg-[#3db8a8] transition-transform duration-300"
            style={{ transform: 'scaleX(var(--p))' }}
          />
        </div>
      </section>

      <section
        data-pin
        className="relative border-y border-white/5 bg-[#121a2b]/60"
      >
        <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-24">
          <div data-pin-copy className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-5xl">
              品牌先於版面裝飾
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#8b9bb0]">
              第一視口只留下名字、一句話與明確行動。其餘資訊往下走——讓訪客先記得你是誰。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-32 px-6 py-32">
        {panels.map((panel) => (
          <article
            key={panel.eyebrow}
            data-stage
            className="max-w-2xl"
            style={reduceMotion ? undefined : { opacity: 0 }}
          >
            <p className="text-sm tracking-[0.18em] text-[#3db8a8]">{panel.eyebrow}</p>
            <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
              {panel.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#8b9bb0]">{panel.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="rounded-2xl border border-white/10 bg-[#121a2b]/80 px-8 py-12 sm:px-12">
          <h2 className="font-display text-3xl font-semibold text-white">下一步</h2>
          <p className="mt-4 max-w-xl text-[#8b9bb0]">
            回到文章閱讀實作細節，或從關於頁認識站長。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/blog"
              className="inline-flex rounded-md bg-[#3db8a8] px-5 py-2.5 text-sm font-medium text-[#0b1220] no-underline transition hover:bg-[#5eead4]"
            >
              前往文章
            </a>
            <a
              href="/about"
              className="inline-flex rounded-md border border-white/15 px-5 py-2.5 text-sm font-medium text-[#c8d2e0] no-underline transition hover:border-[#3db8a8]/50 hover:text-[#3db8a8]"
            >
              關於我
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
