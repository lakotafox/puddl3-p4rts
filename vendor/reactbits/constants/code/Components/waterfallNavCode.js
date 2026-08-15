import code from '@content/Components/WaterfallNav/WaterfallNav.jsx?raw';
import css from '@content/Components/WaterfallNav/WaterfallNav.css?raw';
import tailwind from '@tailwind/Components/WaterfallNav/WaterfallNav.jsx?raw';
import tsCode from '@ts-default/Components/WaterfallNav/WaterfallNav.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/WaterfallNav/WaterfallNav.tsx?raw';

export const waterfallNav = {
  dependencies: `gsap`,
  usage: `import WaterfallNav from './WaterfallNav';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

<div style={{ height: '100vh', background: '#1a1a1a' }}>
  <WaterfallNav
    position="right"
    items={menuItems}
    socialItems={socialItems}
    displaySocials={true}
    displayItemNumbering={true}
    menuButtonColor="#fff"
    openMenuButtonColor="#fff"
    changeMenuColorOnOpen={true}
    colors={['#B497CF', '#5227FF']}
    logoUrl="/path-to-your-logo.svg"
    accentColor="#ff6b6b"
    onMenuOpen={() => console.log('Menu opened')}
    onMenuClose={() => console.log('Menu closed')}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
