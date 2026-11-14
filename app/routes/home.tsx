import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ownest" },
    { name: "description", content: "Choose an Ownest experience." },
  ];
}

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white">
      <section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 sm:p-12">
        <h1 className="text-center text-5xl font-bold tracking-tight sm:text-6xl">
          Ownest
        </h1>
        <nav
          aria-label="Ownest apps"
          className="mt-10 grid gap-4 rounded-2xl p-5 sm:grid-cols-3"
        >
          <Link
            to="/manager"
            className="rounded-xl bg-primary px-5 py-4 text-center font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Manager
          </Link>
          <Link
            to="/mobile-app"
            className="rounded-xl bg-primary px-5 py-4 text-center font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Mobile App
          </Link>
          <Link
            to="/car-app"
            className="rounded-xl bg-primary px-5 py-4 text-center font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Car App
          </Link>
        </nav>
      </section>
    </main>
  );
}
