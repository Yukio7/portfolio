"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export function RenderLoop({ paused, visible, lowQuality }: { paused: boolean; visible: boolean; lowQuality: boolean }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    let last = 0;
    let warmup = 5;
    const interval = 1000 / (lowQuality ? 30 : 60);
    const tick = (time: number) => {
      if (time - last >= interval) {
        invalidate();
        last = time;
        warmup--;
      }
      if (!paused || warmup > 0) frame = requestAnimationFrame(tick);
    };
    const refresh = () => invalidate();
    frame = requestAnimationFrame(tick);
    const events = ["scroll", "resize", "pointermove", "click"] as const;
    if (paused) events.forEach((event) => window.addEventListener(event, refresh, { passive: true }));
    return () => {
      cancelAnimationFrame(frame);
      events.forEach((event) => window.removeEventListener(event, refresh));
    };
  }, [invalidate, paused, visible, lowQuality]);
  return null;
}