import { homeContent } from "@/data/mocks/home";
import { Header } from "@/views/home/header";
import { Hero } from "@/views/home/hero";
import { About } from "@/views/home/about";
import { CreateBand } from "@/views/home/create-band";
import { Portfolio } from "@/views/home/portfolio";
import { Services } from "@/views/home/services";
import { Stats } from "@/views/home/stats";
import { Footer } from "@/views/home/footer";
import { PageLoader } from "@/components/common/page-loader";
import { NavMenu } from "@/components/common/nav-menu";
import { RequestModal } from "@/components/common/request-modal";

/**
 * Home view — Server Component. Assembles the page from co-located section
 * components and feeds each its slice of placeholder content. Animation runs in
 * the client leaves (the spring components inside each section).
 */
export const HomeView = () => {
  return (
    <>
      <PageLoader />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Header
        brand={homeContent.brand}
        nav={homeContent.nav}
        meta={homeContent.meta}
      />

      <main id="main">
        <Hero hero={homeContent.hero} />
        <About about={homeContent.about} />
        <CreateBand words={homeContent.create.words} />
        <Portfolio portfolio={homeContent.portfolio} />
        <Services services={homeContent.services} />
        <Stats stats={homeContent.stats} />
      </main>

      <Footer brand={homeContent.brand} footer={homeContent.footer} />

      <NavMenu />
      <RequestModal />
    </>
  );
};
