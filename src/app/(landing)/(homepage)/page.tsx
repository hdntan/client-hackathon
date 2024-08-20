import HomePage from "@/app/(landing)/(homepage)/HomePage";
import { ModeToggleTheme } from "@/components/ModeToggleTheme";
import WelcomeBoard from "@/components/WelcomeBoard";
import Image from "next/image";

export default function Home() {

  return (
    <main className="w-full">
      <HomePage/>
    </main>
  );
}
