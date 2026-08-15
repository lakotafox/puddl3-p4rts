import code from '@content/TextAnimations/DepartureBoard/DepartureBoard.jsx?raw';
import css from '@content/TextAnimations/DepartureBoard/DepartureBoard.css?raw';
import tailwind from '@tailwind/TextAnimations/DepartureBoard/DepartureBoard.jsx?raw';
import tsCode from '@ts-default/TextAnimations/DepartureBoard/DepartureBoard.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/DepartureBoard/DepartureBoard.tsx?raw';

export const departureBoard = {
  dependencies: ``,
  usage: `import DepartureBoard from './DepartureBoard';

<DepartureBoard
  words={['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE']}
  flipDuration={0.12}
  stagger={0.06}
  cycleDelay={2400}
  charset="alphanumeric"
  flipsPerChar={8}
  tileColor="#111827"
  textColor="#f8fafc"
  tileRadius={8}
  gap={6}
  fontSize={52}
  loop
  padTo={12}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
