"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
const durationMs = 650;

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduce;
}

function useInViewOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return { ref, shown: reduce || shown, reduce };
}

function revealStyle(
  shown: boolean,
  reduce: boolean,
  delay = 0,
  distance = 16,
): CSSProperties {
  if (reduce) return {};
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity ${durationMs}ms ${ease} ${delay}s, transform ${durationMs}ms ${ease} ${delay}s`,
  };
}

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: Props) {
  const { ref, shown, reduce } = useInViewOnce();
  return (
    <div ref={ref} className={className} style={revealStyle(shown, reduce, delay)}>
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, shown, reduce } = useInViewOnce();
  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as ReactElement<{ shown?: boolean; reduce?: boolean; delay?: number }>, {
          shown,
          reduce,
          delay: i * 0.065,
        });
      })}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  shown = true,
  reduce = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  shown?: boolean;
  reduce?: boolean;
  delay?: number;
}) {
  return (
    <div className={className} style={revealStyle(shown, reduce, delay, 14)}>
      {children}
    </div>
  );
}
