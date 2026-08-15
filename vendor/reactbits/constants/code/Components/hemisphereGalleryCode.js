import code from '@content/Components/HemisphereGallery/HemisphereGallery.jsx?raw';
import css from '@content/Components/HemisphereGallery/HemisphereGallery.css?raw';
import tailwind from '@tailwind/Components/HemisphereGallery/HemisphereGallery.jsx?raw';
import tsCode from '@ts-default/Components/HemisphereGallery/HemisphereGallery.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/HemisphereGallery/HemisphereGallery.tsx?raw';

export const hemisphereGallery = {
  dependencies: `@use-gesture/react`,
  usage: `import HemisphereGallery from './HemisphereGallery';
export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <HemisphereGallery />
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
