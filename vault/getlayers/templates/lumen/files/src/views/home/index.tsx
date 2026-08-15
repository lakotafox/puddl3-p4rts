import { heroContent } from "@/data/mocks/home";
import { HeroSection } from "@/views/home/hero-section";
import { Preloader } from "@/views/home/preloader";

/**
 * Home view — a Server Component (hard rule #6). Renders the PUDDL3 hero (copy
 * supplied as data) behind the intro `<Preloader>`, which reveals it via a
 * circular mask on load. Client leaves: the shader, the tilt card, and the
 * preloader.
 */
export const HomeView = () => {
  return (
    <main id="main" className="w-full">
      <HeroSection content={heroContent} />
      <Preloader />
    </main>
  );
};
