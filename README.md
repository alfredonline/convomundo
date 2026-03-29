# ConvoMundo

ConvoMundo is a Next.js app for language teachers and learners. It serves conversation topics, questions, vocabulary, and classroom-ready prompts from MongoDB.

## Stack

- Next.js App Router
- React 19
- Tailwind CSS 4
- MongoDB with Mongoose
- Formspree for the contributor form

## Local development

Install dependencies:

```bash
npm install
```

Create a root `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/convomundo
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Available routes

- `/`
- `/languages`
- `/topic/[language]/[id]`
- `/work-with-us`
- `/api/topics?lang=English`
- `/api/topics/:id`
- `/api/languages`

## Build for production

```bash
npm run build
npm start
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string used by the app and API routes |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Base URL for canonical metadata |

## Notes

- The app now fetches topic data server-side through the shared Mongo data layer and exposes matching Next.js API routes for client or external access.
- Legacy AWS/Terraform files are still in `infra/` if you want to reference the previous hosting setup while moving to Vercel.
