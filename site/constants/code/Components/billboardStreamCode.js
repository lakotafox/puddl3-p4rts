import code from '@content/Components/BillboardStream/BillboardStream.jsx?raw';
import css from '@content/Components/BillboardStream/BillboardStream.css?raw';
import tailwind from '@tailwind/Components/BillboardStream/BillboardStream.jsx?raw';
import tsCode from '@ts-default/Components/BillboardStream/BillboardStream.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BillboardStream/BillboardStream.tsx?raw';

export const billboardStream = {
  dependencies: `ogl`,
  usage: `import BillboardStream from './BillboardStream'

const items = [
  'https://picsum.photos/500/500?grayscale', 
  'https://picsum.photos/600/600?grayscale', 
  'https://picsum.photos/400/400?grayscale'
];

<div style={{ height: '600px', position: 'relative' }}>
  <BillboardStream items={items}/>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
