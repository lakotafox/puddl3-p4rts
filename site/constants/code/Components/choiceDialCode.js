import code from '@content/Components/ChoiceDial/ChoiceDial.jsx?raw';
import css from '@content/Components/ChoiceDial/ChoiceDial.css?raw';
import tailwind from '@tailwind/Components/ChoiceDial/ChoiceDial.jsx?raw';
import tsCode from '@ts-default/Components/ChoiceDial/ChoiceDial.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ChoiceDial/ChoiceDial.tsx?raw';

export const choiceDial = {
  usage: `import ChoiceDial from './ChoiceDial';

<ChoiceDial
  items={['Ambient', 'House', 'Techno', 'Jazz', 'Lo-Fi', 'Synthwave']}
  defaultSelected={2}
  textColor="#a6a6a6"
  activeColor="#ffffff"
  side="left"
  fontSize={3}
  spacing={1.4}
  curve={1}
  tilt={6}
  blur={2}
  fade={0.25}
  smoothing={200}
  inset={80}
  loop={false}
  draggable
  soundUrl="/sounds/click-soft.mp3"
  soundVolume={0.5}
  onChange={(index, item) => console.log(index, item)}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
