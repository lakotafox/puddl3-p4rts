import code from '@content/Components/DeckCycle/DeckCycle.jsx?raw';
import css from '@content/Components/DeckCycle/DeckCycle.css?raw';
import tailwind from '@tailwind/Components/DeckCycle/DeckCycle.jsx?raw';
import tsCode from '@ts-default/Components/DeckCycle/DeckCycle.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/DeckCycle/DeckCycle.tsx?raw';

export const deckCycle = {
  dependencies: `gsap`,
  usage: `import DeckCycle, { Card } from './DeckCycle'

<div style={{ height: '600px', position: 'relative' }}>
  <DeckCycle
    cardDistance={60}
    verticalDistance={70}
    delay={5000}
    pauseOnHover={false}
  >
    <Card>
      <h3>Card 1</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 2</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 3</h3>
      <p>Your content here</p>
    </Card>
  </DeckCycle>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
