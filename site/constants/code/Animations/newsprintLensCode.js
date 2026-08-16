import code from '@content/Animations/NewsprintLens/NewsprintLens.jsx?raw';
import css from '@content/Animations/NewsprintLens/NewsprintLens.css?raw';
import tailwind from '@tailwind/Animations/NewsprintLens/NewsprintLens.jsx?raw';
import tsCode from '@ts-default/Animations/NewsprintLens/NewsprintLens.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/NewsprintLens/NewsprintLens.tsx?raw';

export const newsprintLens = {
  dependencies: `ogl`,
  usage: `import NewsprintLens from './NewsprintLens';

<div style={{ height: '500px', position: 'relative' }}>
  <NewsprintLens
    src="https://picsum.photos/seed/halftone-reveal/1200/800"
    inkColor="#141414"
    paperColor="#f4efe4"
    mode="mono"
    dotDensity={90}
    angle={28}
    revealRadius={0.28}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
