import code from '@content/TextAnimations/CipherReveal/CipherReveal.jsx?raw';
import tailwind from '@tailwind/TextAnimations/CipherReveal/CipherReveal.jsx?raw';
import tsCode from '@ts-default/TextAnimations/CipherReveal/CipherReveal.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/CipherReveal/CipherReveal.tsx?raw';

export const cipherReveal = {
  dependencies: `motion`,
  usage: `import CipherReveal from './CipherReveal';

{/* Example 1: Defaults (hover to decrypt) */}
<CipherReveal text="Hover me!" />

{/* Example 2: Customized speed and characters */}
<CipherReveal
text="Customize me"
speed={100}
maxIterations={20}
characters="ABCD1234!?"
className="revealed"
parentClassName="all-letters"
encryptedClassName="encrypted"
/>

{/* Example 3: Click to decrypt (toggle mode) */}
<CipherReveal
text="Click to decrypt"
animateOn="click"
clickMode="toggle"
/>

{/* Example 4: Animate on view (runs once) */}
<div style={{ marginTop: '4rem' }}>
  <CipherReveal
  text="This text animates when in view"
  animateOn="view"
  revealDirection="center"
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
