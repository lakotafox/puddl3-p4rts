/**
 * Home view — a Server Component. Sections are client leaves so this stays one
 * (hard rule #6). Route: `/`.
 */
import { homeHero } from "@/data/mocks/home";

import { Hero } from "./hero";

export const HomeView = () => {
  return (
    <main className="min-h-lvh w-full">
      <Hero content={homeHero} />
    </main>
  );
};
