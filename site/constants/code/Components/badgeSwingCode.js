import code from '@content/Components/BadgeSwing/BadgeSwing.jsx?raw';
import css from '@content/Components/BadgeSwing/BadgeSwing.css?raw';
import tailwind from '@tailwind/Components/BadgeSwing/BadgeSwing.jsx?raw';
import tsCode from '@ts-default/Components/BadgeSwing/BadgeSwing.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BadgeSwing/BadgeSwing.tsx?raw';

export const badgeSwing = {
  dependencies: `three meshline @react-three/fiber @react-three/drei @react-three/rapier`,
  usage: `import BadgeSwing from './BadgeSwing'

<BadgeSwing position={[0, 0, 20]} gravity={[0, -40, 0]} />

// Pass custom images for the card's front/back faces and/or the badgeSwing band.
// frontImage and backImage render independently; imageFit keeps aspect ratio.
// lanyardWidth widens the band so a custom band image has more room.
<BadgeSwing
  position={[0, 0, 20]}
  gravity={[0, -40, 0]}
  frontImage="/my-front.png"
  backImage="/my-back.png"
  imageFit="cover"
  lanyardImage="/my-band.png"
  lanyardWidth={1}
/>

/* IMPORTANT INFO BELOW

1. You MUST have the card.glb and badgeSwing.png files in your project and import them
- these can be downloaded from the repo's files, under src/assets/badgeSwing

2. You can edit your card.glb file in this online .glb editor and change the texture:
- https://modelviewer.dev/editor/
- alternatively, pass the "frontImage" / "backImage" props to swap the card's faces at runtime

4. The png file is the texture for the badgeSwing's band and can be edited in any image editor

5. Your Vite configuration must be updated to include the following in vite.config.js:
assetsInclude: ['**/*.glb']

6. For TS users, you might need these changes:

- src/global.d.ts
export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

- src/vite-env.d.ts
/// <reference types="vite/client" />
declare module '*.glb';
declare module '*.png';
*/`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
