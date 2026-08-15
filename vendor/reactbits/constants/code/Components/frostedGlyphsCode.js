import code from '@content/Components/FrostedGlyphs/FrostedGlyphs.jsx?raw';
import css from '@content/Components/FrostedGlyphs/FrostedGlyphs.css?raw';
import tailwind from '@tailwind/Components/FrostedGlyphs/FrostedGlyphs.jsx?raw';
import tsCode from '@ts-default/Components/FrostedGlyphs/FrostedGlyphs.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/FrostedGlyphs/FrostedGlyphs.tsx?raw';

export const frostedGlyphs = {
  usage: `import FrostedGlyphs from './FrostedGlyphs'

// update with your own icons and colors
const items = [
  { icon: <FiFileText />, color: 'blue', label: 'Files' },
  { icon: <FiBook />, color: 'purple', label: 'Books' },
  { icon: <FiHeart />, color: 'red', label: 'Health' },
  { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
  { icon: <FiEdit />, color: 'orange', label: 'Notes' },
  { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
];

<div style={{ height: '600px', position: 'relative' }}>
  <FrostedGlyphs items={items} className="custom-class"/>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
