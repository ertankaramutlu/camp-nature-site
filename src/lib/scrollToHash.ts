let frame = 0;
let stopUserInterrupt: (() => void) | null = null;

function cancelScrollAnim() {
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  stopUserInterrupt?.();
  stopUserInterrupt = null;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Ease-out quart: başta hızlı, hedefe yaklaşınca yavaşlar. */
function easeOutQuart(t: number) {
  return 1 - (1 - t) ** 4;
}

function durationForDistance(px: number) {
  const dist = Math.abs(px);
  if (dist < 2800) {
    return Math.round(500 + (dist / 2800) * 400);
  }
  return Math.min(1500, Math.round(900 + (dist - 2800) * 0.12));
}

function targetYFor(el: HTMLElement) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const y = window.scrollY + el.getBoundingClientRect().top - margin;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.max(0, Math.min(max, y));
}

export function scrollToHash(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  cancelScrollAnim();

  const start = window.scrollY;
  const end = targetYFor(el);
  const delta = end - start;

  if (prefersReducedMotion() || Math.abs(delta) < 1) {
    window.scrollTo(0, end);
    return;
  }

  const duration = durationForDistance(delta);
  const t0 = performance.now();

  const interrupt = () => cancelScrollAnim();
  window.addEventListener("wheel", interrupt, { passive: true });
  window.addEventListener("touchstart", interrupt, { passive: true });
  stopUserInterrupt = () => {
    window.removeEventListener("wheel", interrupt);
    window.removeEventListener("touchstart", interrupt);
  };

  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, start + delta * easeOutQuart(t));
    if (t < 1) {
      frame = requestAnimationFrame(step);
    } else {
      cancelScrollAnim();
    }
  };

  frame = requestAnimationFrame(step);
}
