import code from '@content/Components/ArcField/ArcField.jsx?raw';
import css from '@content/Components/ArcField/ArcField.css?raw';
import tailwind from '@tailwind/Components/ArcField/ArcField.jsx?raw';
import tsCode from '@ts-default/Components/ArcField/ArcField.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ArcField/ArcField.tsx?raw';

export const arcField = {
  usage: `import ArcField from './ArcField'

<ArcField
  placeholder="david@reactbits.dev"
  buttonText="Get Started"
  theme="dark"
  bend={28}
  height={64}
  width={450}
  onSubmit={value => console.log(value)}
/>

// Light preset, flat, no button
<ArcField
  theme="light"
  bend={0}
  showButton={false}
  showIcon={false}
  placeholder="Search components..."
  type="text"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
