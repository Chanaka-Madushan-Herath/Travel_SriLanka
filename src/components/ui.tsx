"use client";

import { useEffect, useRef, useState } from "react";

export function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return <div className={`bg-[linear-gradient(150deg,#123f38_0%,#c9842a_120%)] ${className ?? ""}`} role="img" aria-label={alt} />;
  }

  return (
    // Wikimedia files redirect, and the static export does not run the image optimizer.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`photo-in ${className ?? ""}`} onError={() => setFailed(true)} />
  );
}

/** Placeholder shown while a place or trip is still loading from Firestore. */
export function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-5 py-20" aria-busy="true">
      <div className="h-8 w-2/3 rounded-full bg-line" />
      <div className="mt-6 h-4 w-full rounded-full bg-line" />
      <div className="mt-3 h-4 w-5/6 rounded-full bg-line" />
      <div className="mt-3 h-4 w-4/6 rounded-full bg-line" />
    </div>
  );
}

/**
 * Fades and slides its children in when they scroll into view.
 * Content that is already on screen at load is left alone, and without
 * JavaScript or with reduced motion everything simply stays visible.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.classList.add("reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("reveal-in");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} style={delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}

/** A thin bar under the top edge that shows how far down the page you are. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`;
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
}

export function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      tabIndex={show ? 0 : -1}
      className={`to-top ${show ? "to-top-on" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

/** Gives its child a gentle 3D tilt that follows the pointer (mouse only). */
export function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    el.style.setProperty("--tx", `${(x * 8).toFixed(1)}px`);
    el.style.setProperty("--ty", `${(y * 8).toFixed(1)}px`);
  }

  function leave() {
    const el = ref.current;
    if (!el) return;
    ["--rx", "--ry", "--tx", "--ty"].forEach((name) => el.style.removeProperty(name));
  }

  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}

export function Stars({ value, label }: { value: number; label: string }) {
  const safe = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span className="tracking-wide text-gold" aria-label={`${safe} ${label}`}>
      {"★".repeat(safe)}
      <span className="text-line">{"★".repeat(5 - safe)}</span>
    </span>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}
