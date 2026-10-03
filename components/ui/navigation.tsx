"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { chapters } from "@/lib/portfolio";

export function Navigation({ active }: { active: number }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label="Arthur Manhaudier, accueil" onClick={() => setOpen(false)}>
        <span className="brand-symbol" aria-hidden="true">a<span>m</span><i /></span>
        <span>ARTHUR<br />MANHAUDIER</span>
      </a>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {[1, 5, 4, 6].map((index) => <a key={index} href={`#${chapters[index].id}`} aria-current={active === index ? "location" : undefined}>{chapters[index].label}</a>)}
      </nav>
      <a href="#contact" className="contact-nav">Échangeons <ArrowUpRight size={16} /></a>
      <button className="icon-button menu-toggle" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      {open && <nav id="mobile-menu" className="mobile-menu" aria-label="Navigation mobile">
        {chapters.slice(1).map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} onClick={() => setOpen(false)}><span>{chapter.number}</span>{chapter.label}<ArrowUpRight size={20} /></a>)}
      </nav>}
    </header>
  );
}