# Arthur Manhaudier / Infrastructure as a World

Portfolio Next.js App Router, React, TypeScript strict, React Three Fiber,
Three.js, Drei, GSAP ScrollTrigger, Lenis et Tailwind CSS.

## Demarrage

```bash
npm ci
npm run dev
```

Ouvrir <http://localhost:3000>. Node.js 22 LTS ou plus recent recommande.

## Personnalisation

Les contenus se trouvent dans `lib/portfolio.ts` :

- `profile` : identite, presentation, email, LinkedIn, GitHub et CV.
- `projects` : tableau volontairement vide. Chaque entree accepte `id`, `name`, `description`, `technologies`, puis `role`, `results`, `github` et `demo` optionnels. Une entree cree un module 3D et un bouton ouvrant sa fiche.
- `experiences` : seul Enedis est renseigne. Ajouter les informations confirmees dans `role`, `period` et `description`.
- `cloudServices`, `skills`, `skillConnections` : technologies et relations.

Un lien vide reste un libelle "A VENIR", sans fausse destination. Placer le CV
dans `public`, puis renseigner par exemple `/cv-arthur-manhaudier.pdf` dans
`profile.links.cv`. Utiliser des URL HTTPS verifiees pour les liens externes.
Ne pas publier de chiffres, dates ou realisations non confirmes.

## Organisation

```text
app/                    Routes, metadata et design system
components/portfolio.tsx Assemblage et etats du rendu
components/3d/          Camera, geometries, connexions, labels et particules
components/sections/    Contenu editorial
components/ui/          Navigation, curseur, controles et dialogue
hooks/                  Synchronisation GSAP / Lenis
lib/                    Donnees et etat transitoire du monde
shaders/                Shader GLSL des particules
public/models/          Reserve aux futurs GLB
public/textures/        Reserve aux futures textures
tests/                  Tests navigateur Playwright
```

## Rendu et performances

- Huit chapitres dans un espace 3D continu, avec une pause de lecture par etape.
- Import dynamique de la 3D ; contenu HTML disponible immediatement.
- Geometries procedurales et eclairage local, sans modele ni HDR distant.
- Particules en un seul nuage de points GPU, pas des centaines de meshes.
- Seuls les chapitres proches sont montes. Maximum 30 fps et DPR 1 sur mobile ou petit processeur ; 60 fps et DPR maximal 1.6 sur desktop.
- Rendu interrompu en arriere-plan et a la demande en mode mouvement reduit.
- `prefers-reduced-motion`, clavier, ancres et fallback sans WebGL.
- Chargement non bloquant : etapes reelles, sans pourcentage simule.
- Le pipeline et son statut de deploiement sont une simulation visuelle.

Le moteur utilise WebGL2. Les scenes ne justifient pas un second pipeline
WebGPU/TSL : il n'y a pas de simulation lourde ni de post-traitement couteux.
Le brouillard est un brouillard de profondeur, pas un effet volumetrique.
Pas de profondeur de champ artificielle pour conserver des labels nets.
Si des GLB sont ajoutes, les optimiser avec Meshopt/Draco, utiliser `useGLTF`
et conserver les niveaux de qualite et le fallback.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

La suite couvre les pixels du canvas, le mouvement, les parcours, les captures,
le clavier, le mode sans WebGL et l'accessibilite axe. Les captures et traces
restent dans `test-results/` et ne sont pas versionnees.

Un navigateur local peut etre selectionne avec `PLAYWRIGHT_CHANNEL=msedge`.
Respecter les politiques de l'entreprise : sur la machine de creation, le
telechargement Chromium est bloque par la chaine de certificats et le debogage
d'Edge par la politique administrateur. Les parcours et audits ont donc ete
controles dans le navigateur integre de VS Code. La suite CLI reste a executer
dans un environnement autorise.

## Vercel

Importer le depot avec le preset Next.js, commande `npm run build` et dossier
racine du projet. Aucune variable d'environnement n'est necessaire. Geist est
telecharge au build par `next/font`, puis servi localement. Completer les vrais
projets et coordonnees avant publication. Aucun deploiement public automatique.
