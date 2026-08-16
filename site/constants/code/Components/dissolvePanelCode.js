import code from '@content/Components/DissolvePanel/DissolvePanel.jsx?raw';
import css from '@content/Components/DissolvePanel/DissolvePanel.css?raw';
import tailwind from '@tailwind/Components/DissolvePanel/DissolvePanel.jsx?raw';
import tsCode from '@ts-default/Components/DissolvePanel/DissolvePanel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/DissolvePanel/DissolvePanel.tsx?raw';

export const dissolvePanel = {
  dependencies: `gsap`,
  usage: `import DissolvePanel from './DissolvePanel';

<DissolvePanel width={200} height={300} image="https://picsum.photos/300/400?grayscale">
  <h2>Decay<br/>Card</h2>
</DissolvePanel>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
