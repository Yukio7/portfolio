import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { ExploreLink } from "@/components/ui/world-controls";

export function Hero() {
  return <section id="home" className="hero story-section" aria-labelledby="hero-title">
    <div className="hero-topline"><span><i /> L’INFRASTRUCTURE COMME UN MONDE</span><span className="hero-edition">LYON, FRANCE / PORTFOLIO 2026</span></div>
    <h1 id="hero-title" className="hero-title"><span>{profile.firstName}</span><span>{profile.lastName}<span className="title-dot">.</span></span></h1>
    <div className="hero-description"><div className="hero-disciplines"><span>INGÉNIEUR CLOUD / DEVOPS JUNIOR</span><span>COORDINATION TECHNIQUE</span></div><p>{profile.tagline}</p><a className="hero-cta" href="#projects">Mes réalisations<ArrowUpRight size={17} /></a></div>
    <div className="object-annotation" aria-hidden="true"><span className="annotation-cross">+</span><div>01 / LE CŒUR<span>CALCUL · DONNÉES · AUTOMATISATION</span></div><span className="annotation-line" /></div>
    <div className="hero-bottom"><ExploreLink /><p>DE LA COMPLEXITÉ<br /><span>À LA CLARTÉ.</span></p><span className="coordinates">TECHNIQUE & COLLECTIF<br /><span>UN MÊME FIL CONDUCTEUR</span></span></div>
  </section>;
}