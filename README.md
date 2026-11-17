# Welcome to Ownest!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

The production build includes the installable PWA manifest and service worker. Open the deployed site over HTTPS (or the local production preview), then use the browser's **Install app** / **Add to Home Screen** option. The service worker caches the app shell and static assets for offline loading; notification broadcasts require an internet connection and a configured Supabase project.

## Deployment

### Supabase Realtime notifications

Notifications use Supabase Realtime Broadcast; a separate WebSocket server is not needed. Copy `.env.example` to `.env`, then fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from **Supabase Dashboard → Project Settings → API**. The project URL must be an HTTPS API URL such as `https://<project-ref>.supabase.co`, not a database connection string.

For GitHub Pages, configure the repository's Actions settings:

1. Add the Actions variable `VITE_SUPABASE_URL`.
2. Add the Actions secret `VITE_SUPABASE_PUBLISHABLE_KEY` (legacy anon/public keys also work if that is what the project provides).
3. Rerun the **Deploy React App** workflow so the values are embedded into the static build.

The publishable/anon key is intended for browser use. Never put a Supabase `service_role` or secret key in a `VITE_*` variable. The current `.env` values must be replaced with the matching Supabase project URL and publishable key. If the database credential previously placed there is real or was committed, rotate it in its original database provider and remove it from Git history as appropriate.

Realtime public broadcast channels are used for notifications, so messages should be treated as public to anyone who can connect to this channel. Add Supabase Realtime Broadcast authorization policies and use private channels/authentication if notifications contain private data.

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
