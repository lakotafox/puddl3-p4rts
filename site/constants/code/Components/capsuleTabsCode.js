import code from '@content/Components/CapsuleTabs/CapsuleTabs.jsx?raw';
import css from '@content/Components/CapsuleTabs/CapsuleTabs.css?raw';
import tailwind from '@tailwind/Components/CapsuleTabs/CapsuleTabs.jsx?raw';
import tsCode from '@ts-default/Components/CapsuleTabs/CapsuleTabs.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/CapsuleTabs/CapsuleTabs.tsx?raw';

export const capsuleTabs = {
  dependencies: `gsap`,
  usage: `import CapsuleTabs from './CapsuleTabs';
import logo from '/path/to/logo.svg';

<CapsuleTabs
  logo={logo}
  logoAlt="Company Logo"
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]}
  activeHref="/"
  className="custom-nav"
  ease="power2.easeOut"
  baseColor="#000000"
  pillColor="#ffffff"
  hoveredPillTextColor="#ffffff"
  pillTextColor="#000000"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
