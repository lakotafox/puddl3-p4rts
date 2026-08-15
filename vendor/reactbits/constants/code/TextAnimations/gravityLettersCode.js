import code from '@content/TextAnimations/GravityLetters/GravityLetters.jsx?raw';
import css from '@content/TextAnimations/GravityLetters/GravityLetters.css?raw';
import tailwind from '@tailwind/TextAnimations/GravityLetters/GravityLetters.jsx?raw';
import tsCode from '@ts-default/TextAnimations/GravityLetters/GravityLetters.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/GravityLetters/GravityLetters.tsx?raw';

export const gravityLetters = {
  dependencies: 'matter-js',
  usage: `import GravityLetters from './GravityLetters';
  
<GravityLetters
  text={\`foxbits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.\`}
  highlightWords={["React", "Bits", "animated", "components", "simplify"]}
  highlightClass="highlighted"
  trigger="hover"
  backgroundColor="transparent"
  wireframes={false}
  gravity={0.56}
  fontSize="2rem"
  mouseConstraintStiffness={0.9}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
