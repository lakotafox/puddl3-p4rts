import code from '@content/Animations/DecalLift/DecalLift.jsx?raw';
import css from '@content/Animations/DecalLift/DecalLift.css?raw';
import tailwind from '@tailwind/Animations/DecalLift/DecalLift.jsx?raw';
import tsCode from '@ts-default/Animations/DecalLift/DecalLift.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/DecalLift/DecalLift.tsx?raw';

export const decalLift = {
  installation: 'npm install gsap',
  usage: `import DecalLift from './DecalLift'
import logo from './assets/sticker.png'
  
<DecalLift
  imageSrc={logo}
  width={200}
  rotate={30}
  peelBackHoverPct={20}
  peelBackActivePct={40}
  shadowIntensity={0.6}
  lightingIntensity={0.1}
  initialPosition={{ x: -100, y: 100 }}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
