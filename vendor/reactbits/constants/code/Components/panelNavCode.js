import code from '@content/Components/PanelNav/PanelNav.jsx?raw';
import css from '@content/Components/PanelNav/PanelNav.css?raw';
import tailwind from '@tailwind/Components/PanelNav/PanelNav.jsx?raw';
import tsCode from '@ts-default/Components/PanelNav/PanelNav.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/PanelNav/PanelNav.tsx?raw';

export const panelNav = {
  dependencies: `gsap`,
  usage: `import PanelNav from './PanelNav'
import logo from './logo.svg';

const App = () => {
  const items = [
    {
      label: "About",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#2F293A", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <PanelNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
