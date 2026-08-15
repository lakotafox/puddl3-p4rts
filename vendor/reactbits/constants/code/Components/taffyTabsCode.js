import code from '@content/Components/TaffyTabs/TaffyTabs.jsx?raw';
import css from '@content/Components/TaffyTabs/TaffyTabs.css?raw';
import tailwind from '@tailwind/Components/TaffyTabs/TaffyTabs.jsx?raw';
import tsCode from '@ts-default/Components/TaffyTabs/TaffyTabs.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TaffyTabs/TaffyTabs.tsx?raw';

export const taffyTabs = {
  usage: `import TaffyTabs from './TaffyTabs'

// update with your own items
const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

<div style={{ height: '600px', position: 'relative' }}>
  <TaffyTabs
    items={items}
    particleCount={15}
    particleDistances={[90, 10]}
    particleR={100}
    initialActiveIndex={0}
    animationTime={600}
    timeVariance={300}
    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
