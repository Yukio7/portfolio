import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PrintButton } from "@/components/ui/print-button";
import { cloudServices, coordinationSkills, education, experiences, languages, profile, skills } from "@/lib/portfolio";

export const metadata: Metadata = { title: "CV | Arthur Manhaudier", description: "Parcours, expériences et compétences d'Arthur Manhaudier, ingénieur Cloud / DevOps junior et coordinateur de projets techniques à Lyon." };

export default function CurriculumVitae() {
  return <main className="cv-page">
    <nav className="cv-toolbar" aria-label="Actions du CV"><Link href="/#contact"><ArrowLeft size={16} />Portfolio</Link><PrintButton /></nav>
    <article className="cv-document">
      <header className="cv-header"><p className="cv-kicker">CURRICULUM VITAE</p><h1>{profile.firstName}<br />{profile.lastName}</h1><p className="cv-role">{profile.role}<br />{profile.secondaryRole}</p><address><span>{profile.location}</span><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a><a href={`mailto:${profile.links.email}`}>{profile.links.email}</a><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={13} /></a></address></header>
      <section aria-labelledby="cv-profile"><h2 id="cv-profile">Profil</h2><p>{profile.about}</p></section>
      <section aria-labelledby="cv-experience"><h2 id="cv-experience">Expériences professionnelles</h2>{experiences.map((experience) => <div className="cv-entry" key={experience.company}><div className="cv-entry-heading"><h3>{experience.company}</h3><span>{experience.period}</span></div><p className="cv-entry-role">{experience.role} · {experience.location}</p><ul>{experience.highlights?.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>)}</section>
      <section aria-labelledby="cv-skills"><h2 id="cv-skills">Compétences</h2><dl><div><dt>Cloud et infrastructure</dt><dd>AWS ({cloudServices.slice(1).map((service) => service.name).join(", ")}), Terraform</dd></div><div><dt>Outils et développement</dt><dd>{skills.filter((skill) => !["AWS", "Terraform"].includes(skill.name)).map((skill) => skill.name).join(" · ")}</dd></div><div><dt>Coordination de projet</dt><dd>{coordinationSkills.join(" · ")}</dd></div></dl></section>
      <section aria-labelledby="cv-education"><h2 id="cv-education">Formation</h2>{education.map((item) => <div className="cv-education" key={item.school}><span>{item.period}</span><p><strong>{item.school}</strong> · {item.title}</p></div>)}</section>
      <section aria-labelledby="cv-languages"><h2 id="cv-languages">Langues</h2><p>{languages.map((language) => `${language.name} : ${language.level}`).join(" · ")}</p></section>
    </article>
  </main>;
}