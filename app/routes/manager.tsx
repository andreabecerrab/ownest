import { useNotificationSocket } from "../components/notification-socket";

export default function Manager() {
  const { isConnected, sendNotification } = useNotificationSocket();
  const notifications = [
    {
      label: "Notification",
      title: "New Notification",
      text: "You have a new notification from Ownest.",
      color: "bg-notification",
    },
    {
      label: "Reminder",
      title: "Reminder",
      text: "This is your reminder from Ownest.",
      color: "bg-reminder",
    },
    {
      label: "Alert",
      title: "Important Alert",
      text: "An important alert was sent from Ownest.",
      color: "bg-alert",
    },
  ];

  return (
    <section className="flex min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="w-full max-w-2xl rounded-3xl p-8 shadow-2xl shadow-black/30 sm:p-12">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Manager
        </h1>
        <p className="mt-5 text-sm text-slate-300" role="status">
          {isConnected ? "Connected" : "Connecting to notifications…"}
        </p>
        <div className="mt-4 flex flex-col gap-4 rounded-2xl p-5">
          {notifications.map((notification) => (
            <button
              key={notification.label}
              type="button"
              disabled={!isConnected}
              onClick={() => sendNotification(notification)}
              className={`${notification.color} rounded-xl px-5 py-4 text-center font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {notification.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}