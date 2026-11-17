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

The production build includes the installable PWA manifest and service worker. Open the deployed site over HTTPS (or the local production preview), then use the browser's **Install app** / **Add to Home Screen** option. The service worker caches the app shell and static assets for offline loading; live notifications still require the separately hosted WebSocket server.

## Deployment

### GitHub Pages and notifications

GitHub Pages hosts the static frontend only; it cannot run the notification WebSocket server. For local development, `npm run dev` starts that server on port `3001`, and the frontend connects to `ws://localhost:3001` automatically.

To enable notifications on the deployed site:

1. Deploy `server/websocket.js` to a host that supports persistent WebSocket connections and TLS.
2. In **Settings → Secrets and variables → Actions → Variables** for this repository, add `VITE_NOTIFICATION_URL` with the server's secure WebSocket URL (for example, `wss://your-notification-host.example`).
3. If your frontend uses a different origin from `https://andreabecerrab.github.io`, configure `ALLOWED_ORIGINS` on the WebSocket server with the allowed site origin(s), comma-separated.
4. Re-run the **Deploy React App** workflow so the frontend build receives `VITE_NOTIFICATION_URL`.

The WebSocket URL is public configuration, not a secret. Do not put credentials in `VITE_*` variables because they are embedded in the frontend bundle.

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
