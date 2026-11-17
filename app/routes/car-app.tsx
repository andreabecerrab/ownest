import { NotificationListener } from "../components/notification-listener";
import { HomeButton } from "../components/home-button";

export default function CarApp() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <HomeButton />
      <h1 className="text-4xl font-bold">Car App</h1>
      <NotificationListener />
    </main>
  );
}