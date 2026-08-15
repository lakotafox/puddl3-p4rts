import code from '@content/Components/SpringDeck/SpringDeck.jsx?raw';
import css from '@content/Components/SpringDeck/SpringDeck.css?raw';
import tailwind from '@tailwind/Components/SpringDeck/SpringDeck.jsx?raw';
import tsCode from '@ts-default/Components/SpringDeck/SpringDeck.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/SpringDeck/SpringDeck.tsx?raw';

export const springDeck = {
  dependencies: `gsap`,
  usage: `import SpringDeck from './SpringDeck'

const images = [
  "https://picsum.photos/400/400?grayscale",
  "https://picsum.photos/500/500?grayscale",
  "https://picsum.photos/600/600?grayscale",
  "https://picsum.photos/700/700?grayscale",
  "https://picsum.photos/300/300?grayscale"
];

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)"
];

<SpringDeck
  className="custom-springDeck"
  images={images}
  containerWidth={500}
  containerHeight={250}
  animationDelay={1}
  animationStagger={0.08}
  easeType="elastic.out(1, 0.5)"
  transformStyles={transformStyles}
  enableHover={false}
/>`,
  code,
  css,
  tailwind,
  tsTailwind,
  tsCode
};
