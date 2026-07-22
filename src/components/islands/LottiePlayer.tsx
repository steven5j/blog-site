import { useCallback, useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

interface Props {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
}: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);
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
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`Failed to load ${src}`);
        const data = (await res.json()) as object;
        if (!cancelled) setAnimationData(data);
      } catch {
        // Decorative only
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [src]);

  const onDOMLoaded = useCallback(() => {
    if (reduceMotion) {
      lottieRef.current?.goToAndStop(0, true);
    }
  }, [reduceMotion]);

  if (!animationData) {
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{ minHeight: '12rem' }}
      />
    );
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop && !reduceMotion}
      autoplay={autoplay && !reduceMotion}
      className={className}
      aria-hidden="true"
      onDOMLoaded={onDOMLoaded}
    />
  );
}
