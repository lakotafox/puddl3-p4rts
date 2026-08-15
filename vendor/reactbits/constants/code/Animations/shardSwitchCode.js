import code from '@content/Animations/ShardSwitch/ShardSwitch.jsx?raw';
import css from '@content/Animations/ShardSwitch/ShardSwitch.css?raw';
import tailwind from '@tailwind/Animations/ShardSwitch/ShardSwitch.jsx?raw';
import tsCode from '@ts-default/Animations/ShardSwitch/ShardSwitch.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/ShardSwitch/ShardSwitch.tsx?raw';

export const shardSwitch = {
  dependencies: ``,
  usage: `import ShardSwitch from './ShardSwitch';

<ShardSwitch
  firstContent={
    <div className="click-prompt">
      <span>Click me</span>
    </div>
  }
  secondContent={
    <div className="found-message">
      <span>You found me</span>
    </div>
  }
  pixelSize={64}
  gap={0}
  pixelRadius={0}
  pixelSpin={0}
  pixelScale={0.35}
  duration={1400}
  pixelDuration={450}
  pattern="random"
  randomness={0}
  fade
  trigger="click"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
