/**
 * Placeholder content for the DEUC3 home page.
 *
 * Mock data only — passed into the home view via props (never imported into a
 * component directly). Copy is original; asset paths point at the real on-court
 * photography in `public/assets/` (the hero keeps its dedicated background plate).
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface FeaturedCollection {
  brand: string;
  title: string;
  blurb: string;
  cta: string;
  image: string;
  imageAlt: string;
}

export interface MembershipStat {
  value: string;
  caption: string;
  image: string;
  imageAlt: string;
}

export interface HeroContent {
  titleLines: string[];
  taglineLines: string[];
  backgroundImage: string;
  backgroundAlt: string;
  collections: FeaturedCollection[];
  membership: MembershipStat;
}

export interface TrustSlide {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  /** Four oversized ghost words shown behind this coach (2 rows of 2). */
  headline: [string, string, string, string];
}

export interface TrustContent {
  percent: { value: string; caption: string };
  badge: {
    index: string;
    title: string;
    body: string;
  };
  slides: TrustSlide[];
}

export interface Program {
  index: string;
  name: string;
  description: string;
  href: string;
}

export interface ProgramsContent {
  eyebrow: string;
  titleLines: string[];
  programs: Program[];
}

export interface CourtCard {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  tone: "clay" | "blue";
}

export interface FacilitiesContent {
  icon: string;
  iconAlt: string;
  titleLines: string[];
  body: string;
  courts: CourtCard[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsContent {
  eyebrow: string;
  titleLines: string[];
  stats: StatItem[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  titleLines: string[];
  testimonials: Testimonial[];
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface FooterContent {
  blurb: string;
  columns: FooterColumn[];
  contact: { email: string; phone: string; address: string };
  social: NavLink[];
  legal: NavLink[];
  copyright: string;
}

export interface HomeContent {
  brand: string;
  navLeft: NavLink[];
  cta: string;
  hero: HeroContent;
  trust: TrustContent;
  programs: ProgramsContent;
  facilities: FacilitiesContent;
  stats: StatsContent;
  testimonials: TestimonialsContent;
  footer: FooterContent;
}

export const homeContent: HomeContent = {
  brand: "DEUC3",
  navLeft: [
    { label: "Coaching & Programs", href: "#programs" },
    { label: "Courts & Club Nights", href: "#facilities" },
  ],
  cta: "Book a Court",
  hero: {
    titleLines: ["Always In Play"],
    taglineLines: ["Any Hour,", "Any Day"],
    backgroundImage: "/t/baseline/assets/hero/hero-court.webp",
    backgroundAlt: "Player lunging for a shot on a hard court",
    collections: [
      {
        brand: "DEUC3 Pro",
        title: "Court-Ready Gear",
        blurb: "Tour-grade rackets and strings, priced in plain sight.",
        cta: "See the kit",
        image: "/t/baseline/assets/2.webp",
        imageAlt: "Player driving a backhand on a hard court",
      },
      {
        brand: "Night Series",
        title: "Late Drop",
        blurb: "Lightweight layers built for long sessions under lights.",
        cta: "View the line",
        image: "/t/baseline/assets/3.webp",
        imageAlt: "Player stretching for a forehand on clay",
      },
      {
        brand: "Academy Line",
        title: "Junior Range",
        blurb: "Lighter frames and grips, sized for games still growing.",
        cta: "Browse juniors",
        image: "/t/baseline/assets/5.webp",
        imageAlt: "Player set in a ready stance on clay",
      },
    ],
    membership: {
      value: "9K+",
      caption: "Members on court now",
      image: "/t/baseline/assets/1.webp",
      imageAlt: "Player waiting to return on a clay court",
    },
  },
  trust: {
    percent: { value: "100%", caption: "Progress tracked in real time" },
    badge: {
      index: "#01",
      title: "Numbers players trust",
      body: "From first rallies to ranked juniors, players train here because every session is logged and the progress shows up live.",
    },
    slides: [
      {
        name: "Tomas Ferreira",
        role: "Head Coach",
        image: "/t/baseline/assets/5.webp",
        imageAlt: "Head coach set in a ready stance on clay",
        headline: ["Every", "Point", "Counted", "Live"],
      },
      {
        name: "Nadia Keller",
        role: "Performance Coach",
        image: "/t/baseline/assets/4.webp",
        imageAlt: "Performance coach following through on a serve",
        headline: ["Sharper", "Every", "Single", "Session"],
      },
      {
        name: "Dev Chauhan",
        role: "Juniors Lead",
        image: "/t/baseline/assets/1.webp",
        imageAlt: "Juniors lead waiting to return on clay",
        headline: ["Young", "Players", "Rise", "Daily"],
      },
    ],
  },
  programs: {
    eyebrow: "Ways to train",
    titleLines: ["A track for", "every game"],
    programs: [
      {
        index: "01",
        name: "Junior Track",
        description: "Footwork, fundamentals, and first match play for ages 6–14.",
        href: "#junior",
      },
      {
        index: "02",
        name: "Performance Squad",
        description: "High-volume training blocks for competitive and ranked players.",
        href: "#performance",
      },
      {
        index: "03",
        name: "Evening Clinics",
        description: "Small-group sessions any hour the lights are on.",
        href: "#adult",
      },
      {
        index: "04",
        name: "Private Coaching",
        description: "One-to-one sessions that fit your shift, not ours.",
        href: "#private",
      },
    ],
  },
  facilities: {
    icon: "/t/baseline/assets/3.webp",
    iconAlt: "Player stretching for a forehand on clay",
    titleLines: ["See The", "Courts In", "Real Time"],
    body: "Book by the hour, any hour — live availability, one flat rate, and the same conditions you'll compete in.",
    courts: [
      {
        name: "Sunrise Clay",
        description: "An outdoor clay court that opens with the 6 AM crowd.",
        image: "/t/baseline/assets/1.webp",
        imageAlt: "Player deep behind the line on an outdoor clay court",
        tone: "clay",
      },
      {
        name: "Nightshift Blue",
        description: "A floodlit hard court built for precision after dark.",
        image: "/t/baseline/assets/4.webp",
        imageAlt: "Player following through on a blue hard court",
        tone: "blue",
      },
    ],
  },
  stats: {
    eyebrow: "By the numbers",
    titleLines: ["Everything", "in plain sight"],
    stats: [
      { value: "24", label: "Coaches on court" },
      { value: "12", label: "Courts, lit till late" },
      { value: "9K+", label: "Members and counting" },
      { value: "6:04", label: "This morning's first serve" },
    ],
  },
  testimonials: {
    eyebrow: "What members say",
    titleLines: ["Loved on", "every court"],
    testimonials: [
      {
        quote:
          "I watch my serve speed climb week by week. The numbers don't flatter you — they coach you.",
        name: "Amara Diallo",
        role: "Performance Squad",
      },
      {
        quote:
          "Booked a court at 10 PM after my shift — lights on, gate open, no phone calls. It just works.",
        name: "Otto Lindqvist",
        role: "Evening Clinics",
      },
      {
        quote:
          "My son checks his rally count the way other kids check scores. He's on court every day he can be.",
        name: "Rosa Camacho",
        role: "Parent, Junior Track",
      },
    ],
  },
  footer: {
    blurb:
      "A members' tennis club from the PUDDL3 team — live court booking, honest pricing, and coaching that keeps count.",
    columns: [
      {
        heading: "Programs",
        links: [
          { label: "Junior Track", href: "#junior" },
          { label: "Performance Squad", href: "#performance" },
          { label: "Evening Clinics", href: "#adult" },
          { label: "Private Coaching", href: "#private" },
        ],
      },
      {
        heading: "Club",
        links: [
          { label: "Membership", href: "#membership" },
          { label: "Courts", href: "#facilities" },
          { label: "Club Nights", href: "#club" },
          { label: "Gear Shop", href: "#shop" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Coaches", href: "#programs" },
          { label: "Careers", href: "#careers" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    contact: {
      email: "courts@puddl3.xyz",
      phone: "+1 (555) 010-0604",
      address: "44 Rally Row, Brooklyn, NY",
    },
    social: [
      { label: "Instagram", href: "#instagram" },
      { label: "X", href: "#x" },
      { label: "YouTube", href: "#youtube" },
      { label: "LinkedIn", href: "#linkedin" },
    ],
    legal: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
    copyright: "© 2026 DEUC3 Tennis Club, a PUDDL3 company. All rights reserved.",
  },
};
