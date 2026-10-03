"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { chapters } from "@/lib/portfolio";
import { world } from "@/lib/world";

export function useStorytelling(paused: boolean, onChapter: (index: number) => void) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    world.paused = paused;
    const lenis = paused ? null : new Lenis({ duration: 1.15, smoothWheel: true, anchors: true });
    const tick = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
    }
    const nodes = chapters.map((chapter) => document.getElementById(chapter.id));
    let active = -1;
    const update = () => {
      const scroll = window.scrollY;
      let progress = 0;
      for (let index = 0; index < nodes.length - 1; index++) {
        const current = nodes[index];
        const next = nodes[index + 1];
        if (current && next && scroll >= current.offsetTop) {
          progress = index + Math.min(1, Math.max(0, (scroll - current.offsetTop) / (next.offsetTop - current.offsetTop)));
        }
      }
      world.progress = progress;
      const chapter = Math.min(7, Math.floor(progress + 0.3));
      if (chapter !== active) {
        active = chapter;
        onChapter(chapter);
      }
      document.documentElement.style.setProperty("--journey", `${progress / 7 * 100}%`);
    };
    const trigger = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
    const context = gsap.context(() => {
      if (!paused) {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(element, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 94%", toggleActions: "play none none reverse" },
          });
        });
      }
    });
    const pointer = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        world.pointer.x = event.clientX / window.innerWidth * 2 - 1;
        world.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }
    };
    const resize = () => { world.mobile = window.innerWidth < 768; ScrollTrigger.refresh(); };
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("resize", resize);
    resize();
    update();
    return () => {
      lenis?.destroy();
      gsap.ticker.remove(tick);
      trigger.kill();
      context.revert();
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("resize", resize);
    };
  }, [paused, onChapter]);
}