import code from '@content/Components/BeaconTile/BeaconTile.jsx?raw';
import css from '@content/Components/BeaconTile/BeaconTile.css?raw';
import tailwind from '@tailwind/Components/BeaconTile/BeaconTile.jsx?raw';
import tsCode from '@ts-default/Components/BeaconTile/BeaconTile.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BeaconTile/BeaconTile.tsx?raw';

export const beaconTile = {
  usage: `import BeaconTile from './BeaconTile';
  
<BeaconTile className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
  // Content goes here
</BeaconTile>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
