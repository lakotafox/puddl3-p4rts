import code from '@content/Animations/LockOnPointer/LockOnPointer.jsx?raw';
import css from '@content/Animations/LockOnPointer/LockOnPointer.css?raw';
import tailwind from '@tailwind/Animations/LockOnPointer/LockOnPointer.jsx?raw';
import tsCode from '@ts-default/Animations/LockOnPointer/LockOnPointer.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/LockOnPointer/LockOnPointer.tsx?raw';

export const lockOnPointer = {
  dependencies: 'gsap',
  usage: `import LockOnPointer from './LockOnPointer';

export default function App() {
  return (
    <div>
      <LockOnPointer 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      
      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
