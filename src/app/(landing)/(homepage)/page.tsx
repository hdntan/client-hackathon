import HomePage from "@/app/(landing)/(homepage)/HomePage";
import { ModeToggleTheme } from "@/components/ModeToggleTheme";
import WelcomeBoard from "@/components/WelcomeBoard";
import Image from "next/image";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomePage/>
    </main>
  );
}
