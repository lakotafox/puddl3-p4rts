import code from '@content/Components/PatchworkGrid/PatchworkGrid.jsx?raw';
import tailwind from '@tailwind/Components/PatchworkGrid/PatchworkGrid.jsx?raw';
import tsCode from '@ts-default/Components/PatchworkGrid/PatchworkGrid.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/PatchworkGrid/PatchworkGrid.tsx?raw';
import css from '@content/Components/PatchworkGrid/PatchworkGrid.css?raw';

export const patchworkGrid = {
  dependencies: `gsap`,
  usage: `import PatchworkGrid from './PatchworkGrid';

const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    // ... more items
];

<PatchworkGrid
  items={items}
  ease="power3.out"
  duration={0.6}
  stagger={0.05}
  animateFrom="bottom"
  scaleOnHover={true}
  hoverScale={0.95}
  blurToFocus={true}
  colorShiftOnHover={false}
/>
`,
  code,
  tailwind,
  tsCode,
  tsTailwind,
  css
};
