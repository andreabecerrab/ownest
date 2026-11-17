import { Link } from "react-router";

export function HomeButton() {
  return (
    <Link
      to="/"
      aria-label="Go to home"
      title="Home"
      className="fixed right-5 top-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-white shadow-lg shadow-black/30 transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
