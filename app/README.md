# ConvoMundo (Frontend)

Frontend for [ConvoMundo](https://convomundo.com): conversation topics and questions for language teachers. Built with **React**, **TypeScript**, **Vite**, **React Router**, and **Tailwind CSS**.

## Contributing

### Developers

- **Code**: See the root [README](../README.md) for repo layout, API, and infrastructure. Contribute via pull requests and the [GitHub repository](https://github.com/alfredonline/convomundo).

### Teachers and non-technical contributors

If you want to **add a topic or question** to ConvoMundo but don’t use GitHub:

1. Go to [Work With Us](https://convomundo.com/work-with-us) on convomundo.com.
2. Use the **“Suggest a topic or question”** form: enter your email and describe the topic or questions you’d like to see.
3. We’ll review your suggestion and get it onto the site.

This form is for teachers and other contributors who prefer not to use the codebase directly.

## Tech stack

- **React** + **TypeScript**
- **Vite** (dev server and build)
- **React Router** (routing and loaders)
- **Tailwind CSS** (styling)
- **Formspree** (help form on Work With Us for topic/question suggestions)

## Quick start

```bash
npm install
npm run dev
```

Vite will print the dev URL (e.g. `http://localhost:5173`). For full-stack local development, run the API from the `api/` folder and point the app at it (see root README and `app/src/constants/api.ts`).

## Scripts

| Command       | Description                |
|---------------|----------------------------|
| `npm run dev` | Start dev server (Vite)    |
| `npm run build` | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |

## Project structure

- `src/screens/` – Route-level pages (landing, languages, topic, work-with-us)
- `src/components/` – Reusable UI (navbar, footer, topic-card, searchbar, help-form, etc.)
- `src/constants/` – API URLs, branding
- `src/hooks/` – Custom hooks (e.g. useScrollToTop)

Data is loaded in route loaders (server-side style) and passed to components; the API is called from loaders, not from `useEffect` in the UI.
