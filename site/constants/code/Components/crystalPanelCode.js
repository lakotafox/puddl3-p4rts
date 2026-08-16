import code from '@content/Components/CrystalPanel/CrystalPanel.jsx?raw';
import css from '@content/Components/CrystalPanel/CrystalPanel.css?raw';
import tailwind from '@tailwind/Components/CrystalPanel/CrystalPanel.jsx?raw';
import tsCode from '@ts-default/Components/CrystalPanel/CrystalPanel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/CrystalPanel/CrystalPanel.tsx?raw';

export const crystalPanel = {
  usage: `import CrystalPanel from './CrystalPanel'

// Basic usage
<CrystalPanel 
  width={300} 
  height={200}
  borderRadius={24}
  className="my-custom-class"
>
  <h2>Glass Surface Content</h2>
</CrystalPanel>

// Custom displacement effects
<CrystalPanel
  displace={15}
  distortionScale={-150}
  redOffset={5}
  greenOffset={15}
  blueOffset={25}
  brightness={60}
  opacity={0.8}
  mixBlendMode="screen"
>
  <span>Advanced Glass Distortion</span>
</CrystalPanel>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
