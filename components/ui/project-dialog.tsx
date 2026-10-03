"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/lib/portfolio";

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (project) element?.showModal();
    else element?.close();
  }, [project]);
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    {project && <div className="dialog-body">
      <button className="icon-button dialog-close" aria-label="Fermer le projet" onClick={onClose}><X /></button>
      <p className="eyebrow">{project.company} / {project.period}</p><h2 id="project-dialog-title">{project.name}</h2><p>{project.description}</p>
      {project.role && <p><strong>Rôle</strong><br />{project.role}</p>}
      {project.results && <p><strong>Résultats</strong><br />{project.results}</p>}
      <ul className="tag-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
      <div className="dialog-links">{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={18} /></a>}{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Voir le projet <ArrowUpRight size={18} /></a>}</div>
    </div>}
  </dialog>;
}