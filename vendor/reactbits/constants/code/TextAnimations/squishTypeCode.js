import code from '@content/TextAnimations/SquishType/SquishType.jsx?raw';
import tailwind from '@tailwind/TextAnimations/SquishType/SquishType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/SquishType/SquishType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/SquishType/SquishType.tsx?raw';

export const squishType = {
  usage: `// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// Font used - https://compressa.preusstype.com/
  
import SquishType from './SquishType';

// Note:
// Make sure the font you're using supports all the variable properties. 
// PUDDL3 P4RTS does not take responsibility for the fonts used

<div style={{position: 'relative', height: '300px'}}>
  <SquishType
    text="Hello!"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={36}
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
