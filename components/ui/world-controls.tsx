"use client";

import { Pause, Play, ArrowDown, ArrowUpRight } from "lucide-react";
import { chapters } from "@/lib/portfolio";

export function WorldControls({ active, paused, onPause, ready, failed }: { active: number; paused: boolean; onPause: () => void; ready: boolean; failed: boolean }) {
  return <>
    <aside className="chapter-rail" aria-label="Chapitres">
      {chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} className={active === index ? "active" : ""} aria-label={chapter.label} aria-current={active === index ? "location" : undefined}><span>{chapter.number}</span><i /><span className="rail-tooltip">{chapter.label}</span></a>)}
    </aside>
    <div className="world-status"><span className={`status-dot ${failed ? "offline" : ""}`} /><span>{failed ? "MODE LECTURE" : ready ? "SYSTÈME ACTIF" : "INITIALISATION"}</span><span className="status-divider">/</span><span>{chapters[active].number} — {chapters[active].label.toUpperCase()}</span></div>
    <button className="motion-toggle icon-button" onClick={onPause} aria-label={paused ? "Activer les animations" : "Réduire les animations"} title={paused ? "Activer les animations" : "Réduire les animations"} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? "EN PAUSE" : "ANIMATIONS"}</span></button>
    <div className="journey-progress" aria-hidden="true" />
  </>;
}

export function ChapterLabel({ index, children }: { index: number; children?: React.ReactNode }) {
  return <div className="eyebrow"><span className="section-number">{chapters[index].number} /</span>{children ?? chapters[index].label}<span className="eyebrow-line" /></div>;
}

export function ExploreLink({ href = "#about", children = "DÉCOUVRIR LE PARCOURS" }: { href?: string; children?: React.ReactNode }) {
  return <a className="explore-link" href={href}><span className="arrow-circle"><ArrowDown size={17} /></span><span>{children}</span><span className="explore-line" /></a>;
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="text-link" href={href}>{children}<ArrowUpRight size={18} /></a>;
}