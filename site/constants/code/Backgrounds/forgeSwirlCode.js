import code from '@content/Backgrounds/ForgeSwirl/ForgeSwirl.jsx?raw';
import css from '@content/Backgrounds/ForgeSwirl/ForgeSwirl.css?raw';
import tailwind from '@tailwind/Backgrounds/ForgeSwirl/ForgeSwirl.jsx?raw';
import tsCode from '@ts-default/Backgrounds/ForgeSwirl/ForgeSwirl.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/ForgeSwirl/ForgeSwirl.tsx?raw';

export const forgeSwirl = {
  dependencies: `ogl`,
  usage: `import ForgeSwirl from './ForgeSwirl';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <ForgeSwirl
    color1="#5227FF"
    color2="#FF9FFC"
    color3="#FFFFFF"
    speed={0.35}
    scale={4}
    detail={3}
    glow={1.6}
    coreSize={0.1}
    swirl={1}
    fold={-0.2}
    blackPoint={0.05}
    brightness={1.3}
    colorMode="molten"
    grain={true}
    grainIntensity={0.05}
    mouseInteraction={true}
    mouseStrength={0.3}
    opacity={1.0}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
