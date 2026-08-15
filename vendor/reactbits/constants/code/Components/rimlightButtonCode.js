import code from '@content/Components/RimlightButton/RimlightButton.jsx?raw';
import css from '@content/Components/RimlightButton/RimlightButton.css?raw';
import tailwind from '@tailwind/Components/RimlightButton/RimlightButton.jsx?raw';
import tsCode from '@ts-default/Components/RimlightButton/RimlightButton.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/RimlightButton/RimlightButton.tsx?raw';

export const rimlightButton = {
  dependencies: `npm i ogl`,
  usage: `import RimlightButton from './RimlightButton';

<RimlightButton
  size="lg"
  radius={18}
  tint="#ffffff"
  tintOpacity={0}
  blur={0}
  textColor="#f5f5f5"
  lineColor="#ffffff"
  baseColor="#525252"
  intensity={1}
  shineSize={10}
  shineFade={40}
  thickness={1}
  speed={0.35}
  followMouse
  proximity={250}
  autoAnimate={false}
  onClick={() => console.log('clicked')}
>
  Get Started
</RimlightButton>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
