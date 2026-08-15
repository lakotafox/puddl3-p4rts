import code from '@content/TextAnimations/KeystrokeReveal/KeystrokeReveal.jsx?raw';
import css from '@content/TextAnimations/KeystrokeReveal/KeystrokeReveal.css?raw';
import tailwind from '@tailwind/TextAnimations/KeystrokeReveal/KeystrokeReveal.jsx?raw';
import tsCode from '@ts-default/TextAnimations/KeystrokeReveal/KeystrokeReveal.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/KeystrokeReveal/KeystrokeReveal.tsx?raw';

export const keystrokeReveal = {
  dependencies: `gsap`,
  usage: `import KeystrokeReveal from './KeystrokeReveal';

<KeystrokeReveal 
  text={["Text typing effect", "for your websites", "Happy coding!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
