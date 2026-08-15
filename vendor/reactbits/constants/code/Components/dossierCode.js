import code from '@content/Components/Dossier/Dossier.jsx?raw';
import css from '@content/Components/Dossier/Dossier.css?raw';
import tailwind from '@tailwind/Components/Dossier/Dossier.jsx?raw';
import tsCode from '@ts-default/Components/Dossier/Dossier.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Dossier/Dossier.tsx?raw';

export const dossier = {
  usage: `import Dossier from './Dossier'

<div style={{ height: '600px', position: 'relative' }}>
  <Dossier size={2} color="#5227FF" className="custom-dossier" />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
