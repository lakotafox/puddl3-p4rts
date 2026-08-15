import { Preloader } from "@/components/common/preloader";
import { homeHero } from "@/data/mocks/home";

import { Hero } from "./hero/hero";

/**
 * Home view — route `/`. A Server Component; the client boundaries live in the
 * animated leaves (preloader, hero heading, contact form, reveals).
 */
export const HomeView = () => {
  return (
    <>
      <Preloader brand={homeHero.brand} images={[homeHero.showcase.image]} />
      <main>
        <Hero content={homeHero} />
      </main>
    </>
  );
};
