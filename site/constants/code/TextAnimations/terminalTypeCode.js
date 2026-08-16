import code from '@content/TextAnimations/TerminalType/TerminalType.jsx?raw';
import tailwind from '@tailwind/TextAnimations/TerminalType/TerminalType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/TerminalType/TerminalType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/TerminalType/TerminalType.tsx?raw';

export const terminalType = {
  dependencies: `three`,
  usage: `// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE
  
import TerminalType from './TerminalType';

<TerminalType
  text='hello_world'
  enableWaves={true}
  asciiFontSize={8}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
