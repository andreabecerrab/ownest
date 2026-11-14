import { useEffect, useState } from "react";
import {
  useNotificationSocket,
  type OwnestNotification,
} from "./notification-socket";

export function NotificationListener() {
  const [notification, setNotification] =
    useState<OwnestNotification | null>(null);

  useNotificationSocket((message) => setNotification(message));

  useEffect(() => {
    if (!notification) return;

    const timeout = window.setTimeout(() => setNotification(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  if (!notification) return null;

  return (
    <aside
      aria-live="polite"
      className="fixed right-5 top-5 z-50 w-[min(22rem,calc(100vw-2.5rem))] rounded-2xl border border-white/10 bg-slate-900 p-4 text-white shadow-2xl shadow-black/40"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
        />
        <div>
          <h2 className="font-semibold">{notification.title}</h2>
          <p className="mt-1 text-sm leading-5 text-slate-300">
            {notification.text}
          </p>
        </div>
        <button
          type="button"
          aria-label="Dismiss notification"
          className="ml-auto text-lg leading-none text-slate-400 hover:text-white"
          onClick={() => setNotification(null)}
        >
          ×
        </button>
      </div>
    </aside>
  );
}