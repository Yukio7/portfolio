"use client";

import { useEffect, useRef } from "react";

export function Cursor({ paused }: { paused: boolean }) {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (paused || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      if (!cursor.current) return;
      cursor.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      cursor.current.dataset.active = String(Boolean((event.target as HTMLElement).closest("a, button, [data-interactive]")));
      cursor.current.style.opacity = "1";
    };
    const leave = () => { if (cursor.current) cursor.current.style.opacity = "0"; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, [paused]);
  return paused ? null : <div className="custom-cursor" ref={cursor} aria-hidden="true"><span /></div>;
}