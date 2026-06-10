# Portfolio - Challenge Front-End

Application web professionnelle construite avec **React + TypeScript (strict)**, **Tailwind CSS**, authentification **Google OAuth 2.0**, espace d'administration protégé et validation de schémas **Zod**.

## Démarrage

```bash
npm install        # legacy-peer-deps géré via overrides
cp .env.example .env.local   # puis renseignez votre Client ID Google
npm run dev        # http://localhost:5173
```

### Variable d'environnement

L'authentification Google nécessite un **Client ID OAuth 2.0** (créé sur [console.cloud.google.com](https://console.cloud.google.com) → Identifiants → ID client OAuth → Application Web, avec `http://localhost:5173` en origine autorisée). À placer dans `.env.local` :

```
VITE_GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
```

### Scripts

```bash
npm run dev           # serveur de dev
npm run build         # tsc -b && vite build (typecheck + bundle)
npm run typecheck     # vérification de types seule
npm run lint          # ESLint (type-aware)
npm run format        # Prettier --write
npm run format:check  # Prettier --check
```

## Stack

React 19 · **TypeScript (strict + `noUncheckedIndexedAccess`)** · Vite 8 · Tailwind CSS 4 · react-router 7 · **Zod** · Google Identity Services · react-icons · ESLint (type-aware) + Prettier

## Architecture

```
src/
├── components/   # UI réutilisable (Button polymorphe, modales, table, toast, ProtectedRoute…)
├── context/      # États globaux (Theme, Auth, Projects, Contacts, Testimonials, Toast)
├── hooks/        # Custom hooks (useAuth, useProjects, useContacts, useImageValidation…)
├── layouts/      # Layout (public) + AdminLayout (back-office)
├── pages/        # Vues routées (lazy-loaded)
├── services/     # googleAuth - Google Identity Services + décodage/validation du token
├── types/        # Schémas Zod = source de vérité, types dérivés via z.infer
├── App.tsx       # Routes + code splitting (React.lazy + Suspense)
└── main.tsx      # Point d'entrée + arbre de Providers
```

## Routes

| Route                 | Accès       | Description                                  |
| --------------------- | ----------- | -------------------------------------------- |
| `/`                   | public      | Accueil + section **Testimonials** dynamique |
| `/about`              | public      | Présentation                                 |
| `/contact`            | public      | Formulaire de contact (validation Zod)       |
| `/projects/:id`       | public      | **Détail d'un projet** (`useParams`)         |
| `/login`              | public      | Connexion Google (sas d'entrée)              |
| `/admin`              | **protégé** | Tableau de bord - KPIs                       |
| `/admin/projects`     | **protégé** | CRUD complet des projets                     |
| `/admin/contacts`     | **protégé** | Consultation des messages reçus              |
| `/admin/testimonials` | **protégé** | Validation / masquage des avis               |
| `*`                   | public      | Page 404                                     |

Toutes les routes sont **code-splittées** (`React.lazy` + `Suspense`). Les routes `/admin/*` sont gardées par `ProtectedRoute` : tout utilisateur non authentifié est redirigé vers `/login` (avec mémorisation de la page demandée).

## Authentification & accès

- **Google Identity Services (OAuth 2.0)** : le script GIS est chargé à la demande, le credential JWT est décodé puis **validé par Zod** avant d'être mappé en `User`.
- Session persistée (localStorage, re-validée par Zod au démarrage).
- Zones protégées via `ProtectedRoute` + `AdminLayout` dédié.

## State management

- **`useReducer` + `useContext`** pour les états complexes (projets, contacts, testimonials, auth) - aucun _prop drilling_, accès via hooks custom.
- Reducers **purs** : génération d'`id`/dates dans les action creators.
- Persistance localStorage, systématiquement re-validée par Zod au chargement.

## Validation (Zod)

Les schémas Zod sont la **source de vérité unique** : les types TypeScript en sont dérivés (`z.infer`), ce qui rend impossible toute divergence entre validation runtime et typage statique. Utilisés pour le formulaire de contact, le credential Google et toutes les données relues depuis le localStorage.

## Typage strict

`strict: true` + `noUncheckedIndexedAccess`, **interdiction du type `any`** (garantie par le lint _type-aware_ `typescript-eslint`, qui bloque aussi le `any` implicite via les règles `no-unsafe-*`).

## Bonus implémentés

- **Éditeur avancé** : import d'image (avec prévisualisation réelle) + tags multiples.
- **Gestion des testimonials** : interface d'admin pour afficher / masquer les avis.
- **Dashboard statistiques** : KPIs (projets, messages reçus, non lus, engagement).

## Choix techniques

### Pas de `tailwind.config.js`

Avec **Tailwind CSS v4**, la configuration se fait en CSS via la directive `@theme` dans `index.css` (approche officielle). Les couleurs et polices y sont définies comme design tokens, surchargés dans `.dark` pour le mode sombre.

### `react-router` (et non `react-router-dom`)

**React Router v7** a consolidé `react-router-dom` dans le paquet `react-router` ; l'API (`BrowserRouter`, `Routes`, `Link`, `useParams`…) est identique. → https://reactrouter.com/upgrading/v6

### `overrides` pour ESLint 10

`eslint-plugin-react` et `eslint-plugin-jsx-a11y` déclarent un peer `eslint` limité à `^9` alors qu'ils fonctionnent avec ESLint 10. Un `overrides` ciblé dans `package.json` résout le conflit proprement (sans désactiver globalement la vérification des peers), donc `npm install` fonctionne sans flag.

## Qualité

Build, `typecheck`, `lint` (type-aware) et `format:check` tous au vert. Accessibilité (ARIA, focus, Escape, lint `jsx-a11y`), typographie fluide (`clamp()`), assets WebP optimisés, Error Boundary, états de chargement.
