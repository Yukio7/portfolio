"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight, Check, Phone, BriefcaseBusiness, Mail, FileText, Plus } from "lucide-react";
import { ChapterLabel, TextLink } from "@/components/ui/world-controls";
import { cloudServices, coordinationSkills, education, experiences, languages, pipeline, profile, projects, skills, type Project } from "@/lib/portfolio";
import { world } from "@/lib/world";

export function AboutSection() {
  return <section id="about" className="story-section about-section" aria-labelledby="about-title">
    <div className="section-top"><ChapterLabel index={1}>L’HUMAIN DERRIÈRE LE SYSTÈME</ChapterLabel><span className="micro-label">COMPRENDRE AVANT DE CONSTRUIRE</span></div>
    <div className="section-copy" data-reveal><h2 id="about-title">Voir l&apos;ensemble.<br /><span>Construire</span><br />l&apos;essentiel.</h2><p className="lead">{profile.introduction}</p><p className="body-copy">{profile.about}</p><div className="discipline-list">{profile.disciplines.map((discipline, index) => <div key={discipline}><span>0{index + 1}</span>{discipline}<ArrowUpRight size={14} /></div>)}</div></div>
    <div className="scene-caption"><i /> LE SYSTÈME, MIS À NU <span>/ 01</span></div>
  </section>;
}

export function CloudSection() {
  const [selected, setSelected] = useState("AWS");
  const service = cloudServices.find((item) => item.name === selected)!;
  return <section id="cloud" className="story-section" aria-labelledby="cloud-title">
    <div className="section-top"><ChapterLabel index={2}>ARCHITECTURE CLOUD</ChapterLabel><span className="micro-label">CHAQUE LIAISON A UN RÔLE</span></div>
    <div className="section-copy" data-reveal><h2 id="cloud-title">Des services.<br /><span>Un ensemble.</span></h2><p className="lead">Le composant compte.<br />La connexion fait la différence.</p><p className="body-copy">Sur AWS, je travaille avec les services de calcul, d’identité, de stockage et de planification. L’enjeu : les faire fonctionner ensemble.</p><div className="service-selector" aria-label="Services Cloud">{cloudServices.map((item) => <button key={item.name} aria-pressed={selected === item.name} onClick={() => { setSelected(item.name); world.activeTechnology = item.name; }} onPointerEnter={() => { world.activeTechnology = item.name; }} onPointerLeave={() => { world.activeTechnology = selected; }}>{item.name}<Plus size={12} /></button>)}</div><div className="service-detail" aria-live="polite"><span>{service.name}</span><p>{service.description}</p></div></div>
    <div className="scene-caption"><i /> DES COMPOSANTS AUX CONNEXIONS <span>/ 02</span></div>
  </section>;
}

export function DevopsSection({ paused }: { paused: boolean }) {
  return <section id="devops" className="story-section" aria-labelledby="devops-title">
    <div className="section-top"><ChapterLabel index={3}>LIVRAISON CONTINUE</ChapterLabel><span className="micro-label">DU GESTE MANUEL AU PROCESSUS FIABLE</span></div>
    <div className="section-copy" data-reveal><h2 id="devops-title">Répéter.<br /><span>Sans repartir</span><br />de zéro.</h2><p className="lead">Une infrastructure décrite.<br />Une livraison reproductible.</p><p className="body-copy">Terraform pour provisionner. GitLab CI/CD pour déployer. Python et Bash pour automatiser les opérations : mes contributions au quotidien chez Enedis.</p><ul className="tag-list">{["GitLab CI/CD", "Terraform", "Jenkins", "Python", "Bash", "AWS"].map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
    <div className={`pipeline-strip ${paused ? "is-paused" : ""}`}><ol>{pipeline.map((step, index) => <li key={step} style={{ "--step": index } as React.CSSProperties}><span className="pipeline-node" /><span>{step}</span>{index < pipeline.length - 1 && <ArrowRight size={12} />}</li>)}</ol><div className="deployment-status"><Check size={12} /> DÉPLOIEMENT RÉUSSI<span>SIMULATION</span></div></div>
    <div className="scene-caption"><i /> DU CODE À LA PRODUCTION <span>/ 03</span></div>
  </section>;
}

export function ProjectsSection({ onSelect }: { onSelect: (project: Project) => void }) {
  return <section id="projects" className="story-section projects-section" aria-labelledby="projects-title" style={projects.length > 2 ? { minHeight: 900 + projects.length * 110 } : undefined}>
    <div className="section-top"><ChapterLabel index={4}>RÉALISATIONS</ChapterLabel><span className="micro-label">ENEDIS / 2024 — 2026</span></div>
    <div className="section-copy" data-reveal><h2 id="projects-title">Construire.<br /><span>Dans le réel.</span></h2><p className="lead">Trois contributions.<br />Un même souci de cohérence.</p><p className="body-copy">De l’automatisation AWS au cadrage de Queen : des missions menées en alternance, au contact des équipes techniques et métiers.</p></div>
    <div className="project-list" data-reveal>{projects.length ? projects.map((project, index) => <button key={project.id} className="project-row" onMouseEnter={() => { world.activeProject = index; }} onMouseLeave={() => { world.activeProject = -1; }} onFocus={() => { world.activeProject = index; }} onBlur={() => { world.activeProject = -1; }} onClick={() => onSelect(project)}><span className="project-index">{String(index + 1).padStart(2, "0")}</span><span><strong>{project.name}</strong><small>{project.technologies.join(" / ")}</small></span><ArrowUpRight size={22} /></button>) : <div className="project-empty"><span className="project-index">01 — 03</span><div><h3>Projets à venir</h3><p>Les études de cas seront publiées ici.</p></div><span className="empty-status"><i /> EN PRÉPARATION</span></div>}</div>
    <div className="scene-caption"><i /> AUTOMATISER · LIVRER · COORDONNER <span>/ 04</span></div>
  </section>;
}

export function ExperienceSection() {
  return <section id="experience" className="story-section experience-section" aria-labelledby="experience-title">
    <div className="section-top"><ChapterLabel index={5}>PARCOURS</ChapterLabel><span className="micro-label">TROIS ANNÉES D’ALTERNANCE</span></div>
    <div className="section-copy" data-reveal><h2 id="experience-title">Du code<br /><span>au collectif.</span></h2><p className="lead">Développer chez Odigo.<br />Élargir le périmètre chez Enedis.</p><div className="experience-timeline">{experiences.map((experience, index) => <article key={`${experience.company}-${index}`}><div className="timeline-marker" /><span className="eyebrow">{experience.period}</span><h3>{experience.company}</h3><p className="experience-role">{experience.role}</p><p className="body-copy">{experience.description}</p><p className="body-copy">{experience.highlights?.at(-1)}</p></article>)}</div><div className="education-list"><h3 className="eyebrow">Formation</h3>{education.map((item) => <article key={item.school}><span>{item.period}</span><div><h4>{item.school}</h4><p>{item.title}</p></div></article>)}</div></div>
    <div className="scene-caption"><i /> UNE TRAJECTOIRE, PLUSIEURS ÉCHELLES <span>/ 05</span></div>
  </section>;
}

export function SkillsSection() {
  const [selected, setSelected] = useState<string>("AWS");
  return <section id="skills" className="story-section skills-section" aria-labelledby="skills-title">
    <div className="section-top"><ChapterLabel index={6}>COMPÉTENCES</ChapterLabel><span className="micro-label">OUTILS TECHNIQUES, LANGAGE COMMUN</span></div>
    <div className="section-copy" data-reveal><h2 id="skills-title">Relier<br /><span>les expertises.</span></h2><p className="lead">La technique pour agir.<br />La coordination pour avancer.</p><div className="skills-directory">{skills.map((skill) => <button key={skill.name} aria-pressed={selected === skill.name} onClick={() => { setSelected(skill.name); world.activeTechnology = skill.name; }} onPointerEnter={() => { world.activeTechnology = skill.name; }} onPointerLeave={() => { world.activeTechnology = selected; }}><span>{skill.name}</span><span>{skill.category}</span><ArrowUpRight size={14} /></button>)}</div><div className="coordination-skills"><h3 className="eyebrow">Coordination de projet</h3><ul className="tag-list">{coordinationSkills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div><div className="language-list">{languages.map((language) => <p key={language.name}>{language.name}<span>{language.level}</span></p>)}</div></div>
    <div className="scene-caption"><i /> LA FORCE DES COMPLÉMENTARITÉS <span>/ 06</span></div>
  </section>;
}

export function ContactSection() {
  const links = [
    { label: "Courriel", href: `mailto:${profile.links.email}`, icon: Mail },
    { label: "LinkedIn", href: profile.links.linkedin, icon: BriefcaseBusiness },
    { label: "Téléphone", href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone },
    { label: "Mon CV", href: profile.links.cv, icon: FileText },
  ];
  return <section id="contact" className="story-section contact-section" aria-labelledby="contact-title">
    <div className="section-top"><ChapterLabel index={7}>LA PROCHAINE CONNEXION</ChapterLabel><TextLink href="#home">Retour en haut</TextLink></div>
    <div data-reveal><h2 id="contact-title">PARLONS<br />DE LA<br /><span>SUITE.</span><ArrowUpRight className="contact-arrow" strokeWidth={1} /></h2><div className="contact-bottom"><div><p className="contact-name">{profile.firstName} {profile.lastName}</p><p className="body-copy">{profile.role}<br />{profile.location}</p></div><div className="contact-links">{links.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={label === "LinkedIn" ? "_blank" : undefined} rel={label === "LinkedIn" ? "noopener noreferrer" : undefined}><Icon size={16} />{label}<ArrowUpRight size={14} /></a>)}</div></div></div>
    <footer><span>© {new Date().getFullYear()} ARTHUR MANHAUDIER</span><span>DU SYSTÈME AU PROJET.</span><span>À BIENTÔT <i /></span></footer>
  </section>;
}