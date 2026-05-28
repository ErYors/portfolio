# Portfolio - Challenge d'Intégration Web Front-End

Portfolio personnel construit à partir de la maquette Figma fournie, avec React 19, Tailwind CSS v4, et un dashboard CRUD complet.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production
npm run lint     # ESLint
```

## Architecture

```
src/
├── assets/             # Images (WebP, SVG)
├── components/         # 20 composants réutilisables (UI, modale, table, toast, error boundary…)
├── contexts/           # Theme + Projects + Toast (+ leurs Providers)
├── hooks/              # useTheme, useProjects, useImageValidation, useToast
├── pages/              # Home, About, Dashboard, NotFound (404)
├── App.jsx             # Routes
├── main.jsx            # Entry point + Providers
└── index.css           # Tailwind + design tokens (@theme)
```

## Hooks React utilisés

| Hook | Usage |
|---|---|
| `useState` | État local (form, theme, modale, projets, carousel, recherche, toasts) |
| `useEffect` | localStorage sync, auto-rotation, scroll lock, keyboard listeners, hash scroll, validation image debounced |
| `useContext` | Theme + Projects + Toast (3 contexts globaux) |
| `useRef` | Auto-focus du premier input de la modale |
| `useCallback` / `useMemo` | Memoization des handlers et de l'API toast |
| Custom `useTheme` | Wrapper du context theme avec guard |
| Custom `useProjects` | Wrapper du context projets avec guard |
| Custom `useImageValidation` | Vérifie une URL d'image en debounced (idle / loading / valid / invalid) |
| Custom `useToast` | Wrapper du context toast avec guard |

## Design tokens

Définis dans `src/index.css` via `@theme`, override dans `.dark` pour le dark mode.

```css
@theme {
  --color-yellow: #fdc435;
  --color-ink: #25282b;
  --color-muted: #828282;
  --color-page: #f9faff;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;

  --font-serif: "Playfair Display", serif;
  --font-body: "Nunito", sans-serif;
  --font-logo: "Comfortaa", sans-serif;
  --font-button: "Roboto", sans-serif;
  --font-nav: "Raleway", sans-serif;
}
```

## Choix techniques

### Pas de `tailwind.config.js`

Le PDF mentionne ce fichier. Avec **Tailwind CSS v4** (2025), il n'existe plus : la config se fait en CSS via la directive `@theme` dans `index.css`. Approche officielle Tailwind Labs.
-> https://tailwindcss.com/docs/theme

### Pas de `react-router-dom`

Le PDF mentionne ce package. **React Router v7** (fin 2024) a consolidé `react-router-dom` dans `react-router`. API rigoureusement identique (`BrowserRouter`, `Routes`, `Link`, `NavLink`...).
-> https://reactrouter.com/upgrading/v6

## Stack

React 19 · Vite 8 · Tailwind CSS 4 · react-router 7 · react-icons · ESLint (+ plugins react & jsx-a11y)
