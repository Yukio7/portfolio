export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  role?: string;
  results?: string;
  github?: string;
  demo?: string;
  company?: string;
  period?: string;
};

export type Experience = {
  company: string;
  role?: string;
  period?: string;
  description?: string;
  location?: string;
  highlights?: string[];
};

export const profile = {
  firstName: "Arthur",
  lastName: "Manhaudier",
  role: "Ingénieur Cloud / DevOps junior",
  secondaryRole: "Coordination de projets techniques",
  location: "Lyon, France",
  phone: "+33 7 81 32 54 66",
  tagline: "Automatiser les systèmes. Relier les équipes. Faire avancer les projets.",
  introduction: "Du système qui fonctionne au projet qui avance.",
  about:
    "Trois années d'expérience en alternance, entre automatisation AWS, infrastructure définie par le code, CI/CD et coordination de projet. Je fais le lien entre les contraintes techniques, les besoins métiers et les décisions à prendre.",
  disciplines: ["Cloud / DevOps", "Coordination de projet", "Automatisation", "Infrastructure définie par le code", "Développement logiciel"],
  links: { email: "arthur.manhaudier@gmail.com", linkedin: "https://www.linkedin.com/in/arthur-manhaudier-a8a7681b7", github: "", cv: "/cv" },
};

export const projects: Project[] = [
  {
    id: "automatisation-aws",
    name: "Automatisation des opérations AWS",
    company: "Enedis", period: "2024 — 2026",
    description: "Développement d'outils Python et de scripts Bash pour automatiser les opérations SysOps sur AWS.",
    technologies: ["AWS", "Python", "Bash", "Linux"],
    role: "Alternant Cloud / DevOps",
  },
  {
    id: "infrastructure-livraison",
    name: "De l'infrastructure au déploiement",
    company: "Enedis", period: "2024 — 2026",
    description: "Provisionnement d'infrastructures avec Terraform et création et maintenance de pipelines GitLab CI/CD pour fiabiliser les déploiements.",
    technologies: ["Terraform", "GitLab CI/CD", "AWS"],
    role: "Alternant Cloud / DevOps",
  },
  {
    id: "queen",
    name: "Queen · Cadrage et coordination",
    company: "Enedis", period: "2024 — 2026",
    description: "Contribution au cadrage et à la préparation du jalon B : périmètre, estimations, budget, ressources, planning et risques. Coordination du suivi d'actions avec les parties prenantes métiers et techniques.",
    technologies: ["Cadrage", "Budget", "Risques", "Agile / Scrum"],
    role: "Contribution au cadrage et à la coordination de projet",
  },
];

export const experiences: Experience[] = [
  {
    company: "Enedis",
    role: "Alternant Cloud / DevOps & coordination de projet",
    period: "09/2024 — 09/2026", location: "Lyon, France",
    description: "Automatiser l'infrastructure, fiabiliser les déploiements et contribuer au pilotage.",
    highlights: [
      "Outils Python et scripts Bash pour les opérations SysOps sur AWS.",
      "Infrastructures Terraform et pipelines GitLab CI/CD.",
      "Cadrage et préparation du jalon B de Queen : périmètre, budget, planning, ressources et risques.",
      "Suivi d'actions métiers / IT ; rôle de Scrum Master pendant deux mois.",
    ],
  },
  {
    company: "Odigo", role: "Alternant développeur",
    period: "09/2022 — 09/2023", location: "Lyon, France",
    description: "Développer des outils internes et améliorer les traitements existants.",
    highlights: [
      "Développement et maintenance d'outils Java et PHP pour la validation de données et le support applicatif.",
      "Automatisation de traitements avec Jenkins, maintenance et amélioration continue en équipe Agile.",
    ],
  },
];

export const education = [
  { school: "IPI Lyon", title: "Titre RNCP niveau 7 · Chef de projet informatique", period: "2024 — 2026" },
  { school: "CNAM Lyon", title: "Licence Informatique", period: "2022 — 2023" },
  { school: "CSND", title: "BTS SIO · Option SLAM", period: "2020 — 2022" },
];

export const languages = [
  { name: "Français", level: "Natif" },
  { name: "Anglais", level: "B2 professionnel" },
  { name: "Espagnol", level: "Notions" },
];

export const coordinationSkills = ["Cadrage", "Planning", "Budget", "Risques", "Reporting", "Coordination métiers / IT", "Agile", "Scrum", "Kanban"];

export const chapters = [
  { id: "home", label: "Accueil", number: "00", title: "L'infrastructure comme un monde" },
  { id: "about", label: "À propos", number: "01", title: "Comprendre le cœur du système" },
  { id: "cloud", label: "Cloud", number: "02", title: "Relier les composants" },
  { id: "devops", label: "DevOps", number: "03", title: "Du code à la production" },
  { id: "projects", label: "Réalisations", number: "04", title: "Construire dans le réel" },
  { id: "experience", label: "Parcours", number: "05", title: "De la technique au collectif" },
  { id: "skills", label: "Compétences", number: "06", title: "Faire dialoguer les expertises" },
  { id: "contact", label: "Contact", number: "07", title: "La prochaine connexion" },
] as const;

export const cloudServices = [
  { name: "AWS", description: "L'infrastructure, pensée comme un ensemble.", position: [0, 0, 0] },
  { name: "IAM", description: "Des accès maîtrisés, au bon périmètre.", position: [-2.3, 1.3, 0.5] },
  { name: "ECS", description: "Orchestrer les applications conteneurisées.", position: [2.2, 1.2, -0.5] },
  { name: "S3", description: "Un stockage objet durable et évolutif.", position: [2.6, -1.2, 0.8] },
  { name: "OpenSearch", description: "Explorer les données et les journaux.", position: [0.4, -1.6, -1.5] },
  { name: "Scheduler", description: "Planifier et automatiser les opérations.", position: [-2.4, -1.1, 0.5] },
] as const;

export const pipeline = ["CODE", "GIT", "INTÉGRATION", "TESTS", "COMPILATION", "DÉPLOIEMENT", "PRODUCTION"] as const;

export const skills = [
  { name: "AWS", category: "Cloud", major: true, position: [0, 0.8, 0] },
  { name: "Terraform", category: "Infrastructure", major: true, position: [-2, 1.4, 0.1] },
  { name: "GitLab", category: "Déploiement", major: true, position: [2, 1.5, 0.4] },
  { name: "Jenkins", category: "Automatisation", major: true, position: [0.4, -0.9, 0.6] },
  { name: "Python", category: "Automatisation", major: false, position: [-2.7, -0.1, 0] },
  { name: "Bash", category: "Systèmes", major: false, position: [-2.1, -1.8, -0.3] },
  { name: "PHP", category: "Développement", major: false, position: [2.7, -0.2, -0.4] },
  { name: "Java", category: "Développement", major: false, position: [2.5, -1.7, 0] },
  { name: "SQL", category: "Données", major: false, position: [1, -2.4, -0.7] },
  { name: "Linux", category: "Systèmes", major: false, position: [-0.9, -2.5, 0.1] },
  { name: "Git", category: "Versionnement", major: false, position: [3.1, 2.8, -0.5] },
  { name: "CI/CD", category: "Déploiement", major: false, position: [-0.6, 2.8, -0.7] },
] as const;

export const skillConnections = [[0, 1], [0, 3], [0, 9], [1, 4], [1, 5], [2, 3], [2, 10], [2, 11], [3, 6], [6, 7], [7, 8], [4, 9], [5, 9], [1, 11]];