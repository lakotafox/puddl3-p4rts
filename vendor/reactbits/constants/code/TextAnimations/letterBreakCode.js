// Fun fact: this is the first component ever made for foxbits!
import code from '@content/TextAnimations/LetterBreak/LetterBreak.jsx?raw';
import tailwind from '@tailwind/TextAnimations/LetterBreak/LetterBreak.jsx?raw';
import tsCode from '@ts-default/TextAnimations/LetterBreak/LetterBreak.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/LetterBreak/LetterBreak.tsx?raw';

export const letterBreak = {
  dependencies: 'gsap @gsap/react',
  usage: `import LetterBreak from "./LetterBreak";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

<LetterBreak
  text="Hello, GSAP!"
  className="text-2xl font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
