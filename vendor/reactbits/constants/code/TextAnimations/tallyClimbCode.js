import code from '@content/TextAnimations/TallyClimb/TallyClimb.jsx?raw';
import tailwind from '@tailwind/TextAnimations/TallyClimb/TallyClimb.jsx?raw';
import tsCode from '@ts-default/TextAnimations/TallyClimb/TallyClimb.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/TallyClimb/TallyClimb.tsx?raw';

export const tallyClimb = {
  dependencies: `motion`,
  usage: `import TallyClimb from './TallyClimb'

<TallyClimb
  from={0}
  to={100}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
