import code from '@content/Components/PinDeck/PinDeck.jsx?raw';
import css from '@content/Components/PinDeck/PinDeck.css?raw';
import tailwind from '@tailwind/Components/PinDeck/PinDeck.jsx?raw';
import tsCode from '@ts-default/Components/PinDeck/PinDeck.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/PinDeck/PinDeck.tsx?raw';

export const pinDeck = {
  dependencies: `lenis`,
  usage: `import PinDeck, { PinDeckItem } from './PinDeck'

<PinDeck>
  <PinDeckItem>
    <h2>Card 1</h2>
    <p>This is the first card in the stack</p>
  </PinDeckItem>
  <PinDeckItem>
    <h2>Card 2</h2>
    <p>This is the second card in the stack</p>
  </PinDeckItem>
  <PinDeckItem>
    <h2>Card 3</h2>
    <p>This is the third card in the stack</p>
  </PinDeckItem>
</PinDeck>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
