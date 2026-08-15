// Placeholder content for the contact form + site footer. Original copy — swap for
// real messaging, links and contact details when available.

export interface ContactContent {
  labelId: string;
  /** Bold intro prompt above the form. */
  heading: string;
  /** Placeholder / label text for each field. */
  fields: { name: string; phone: string; email: string };
  cta: string;
}

export const contactContent: ContactContent = {
  labelId: "contact-title",
  heading:
    "PUDDL3 is always looking to connect with sharp, curious people. Feel free to drop us a line.",
  fields: { name: "Name", phone: "Phone number", email: "Email" },
  cta: "Send",
};

export interface FooterLink {
  label: string;
  href: string;
  /** External links open in a new tab and get rel="noopener". */
  external?: boolean;
}

export interface FooterNavGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  tagline: string;
  labelId: string;
  heading: string;
  cta: FooterLink;
  backToTop: FooterLink;
  linksLabel: string;
  sitemap: FooterNavGroup;
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
  };
  social: FooterNavGroup;
  copyright: string;
  credit: string;
}

export const footerContent: FooterContent = {
  tagline: "Payday, every second.",
  labelId: "footer-title",
  heading: "Have questions? Let's talk.",
  cta: { label: "Fill in the form", href: "#contact" },
  backToTop: { label: "Back to top", href: "#top" },
  linksLabel: "Links",
  sitemap: {
    title: "Sitemap",
    links: [
      { label: "Product", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Security", href: "#" },
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  contact: {
    title: "Contact",
    address: "404 Meridian Ave, Suite 210, Austin, TX 78701",
    phone: "+1 (512) 555-0173",
    email: "hello@puddl3.xyz",
  },
  social: {
    title: "Follow us",
    links: [
      { label: "X (Twitter)", href: "https://x.com", external: true },
      { label: "LinkedIn", href: "https://linkedin.com", external: true },
      { label: "Instagram", href: "https://instagram.com", external: true },
    ],
  },
  copyright: "© 2026 PUDDL3. All rights reserved.",
  credit: "Built by the PUDDL3 team",
};
