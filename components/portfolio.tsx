"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, useSyncExternalStore } from "react";
import { Hero } from "@/components/sections/hero";
import { AboutSection, CloudSection, ContactSection, DevopsSection, ExperienceSection, ProjectsSection, SkillsSection } from "@/components/sections/story-sections";
import { Navigation } from "@/components/ui/navigation";
import { WorldControls } from "@/components/ui/world-controls";
import { Cursor } from "@/components/ui/cursor";
import { ProjectDialog } from "@/components/ui/project-dialog";
import { useStorytelling } from "@/hooks/use-storytelling";
import { projects, type Project } from "@/lib/portfolio";

const WorldScene = dynamic(() => import("@/components/3d/world-scene"), {
  ssr: false,
  loading: () => <div className="module-loading">CHARGEMENT<span>ASSEMBLAGE DE L’INFRASTRUCTURE</span></div>,
});

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const motionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverSnapshot = () => false;

class SceneBoundary extends Component<{ children: React.ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function Portfolio() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, motionSnapshot, serverSnapshot);
  const paused = motionOverride ?? reducedMotion;
  useStorytelling(paused, setActive);

  useEffect(() => {
    if (ready || failed) return;
    let timeout: number | undefined;
    const watch = () => {
      window.clearTimeout(timeout);
      if (!document.hidden) timeout = window.setTimeout(() => setFailed(true), 20000);
    };
    watch();
    document.addEventListener("visibilitychange", watch);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", watch);
    };
  }, [ready, failed]);

  return <div className={`portfolio ${paused ? "reduced-motion" : ""} ${failed ? "reading-mode" : ""}`} data-chapter={active} data-ready={ready || failed}>
    <a className="skip-link" href="#about">Aller au contenu</a>
    <div className="world-canvas" aria-hidden="true">
      {!failed && <SceneBoundary onError={() => setFailed(true)}><WorldScene active={active} paused={paused} onReady={() => setReady(true)} onError={() => setFailed(true)} onProject={(index) => { if (projects[index]) setProject(projects[index]); }} /></SceneBoundary>}
      {failed && <div className="fallback-architecture"><div /><div /><div /><div /></div>}
    </div>
    <div className="scene-vignette" aria-hidden="true" />
    <div className="grain" aria-hidden="true" />
    <Navigation active={active} />
    <main><Hero /><AboutSection /><CloudSection /><DevopsSection paused={paused} /><ProjectsSection onSelect={setProject} /><ExperienceSection /><SkillsSection /><ContactSection /></main>
    <WorldControls active={active} paused={paused} onPause={() => setMotionOverride(!paused)} ready={ready} failed={failed} />
    <Cursor paused={paused} />
    <ProjectDialog project={project} onClose={() => setProject(null)} />
    {!failed && <div className={`boot-status ${ready ? "is-ready" : ""}`} role="status"><span className="boot-cross">+</span><span>{ready ? "INFRASTRUCTURE PRÊTE" : "ASSEMBLAGE EN COURS"}</span><span className="boot-track"><i /></span></div>}
  </div>;
}