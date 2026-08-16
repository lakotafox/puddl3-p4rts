import code from '@content/Components/ZoomShelf/ZoomShelf.jsx?raw';
import css from '@content/Components/ZoomShelf/ZoomShelf.css?raw';
import tailwind from '@tailwind/Components/ZoomShelf/ZoomShelf.jsx?raw';
import tsCode from '@ts-default/Components/ZoomShelf/ZoomShelf.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ZoomShelf/ZoomShelf.tsx?raw';

export const zoomShelf = {
  dependencies: `motion`,
  usage: `import ZoomShelf from './ZoomShelf';

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  <ZoomShelf 
    items={items}
    panelHeight={68}
    baseItemSize={50}
    magnification={70}
  />`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
