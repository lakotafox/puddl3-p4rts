import code from '@content/Components/ConcertinaPanels/ConcertinaPanels.jsx?raw';
import css from '@content/Components/ConcertinaPanels/ConcertinaPanels.css?raw';
import tailwind from '@tailwind/Components/ConcertinaPanels/ConcertinaPanels.jsx?raw';
import tsCode from '@ts-default/Components/ConcertinaPanels/ConcertinaPanels.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ConcertinaPanels/ConcertinaPanels.tsx?raw';

export const concertinaPanels = {
  dependencies: `gsap`,
  usage: `import ConcertinaPanels from './ConcertinaPanels'

const items = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

<ConcertinaPanels
  items={items}
  defaultIndex={2}
  expandRatio={0.52}
  trigger="hover"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
