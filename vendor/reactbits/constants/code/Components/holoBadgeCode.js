import code from '@content/Components/HoloBadge/HoloBadge.jsx?raw';
import css from '@content/Components/HoloBadge/HoloBadge.css?raw';
import tailwind from '@tailwind/Components/HoloBadge/HoloBadge.jsx?raw';
import tsCode from '@ts-default/Components/HoloBadge/HoloBadge.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/HoloBadge/HoloBadge.tsx?raw';

export const holoBadge = {
  usage: `import HoloBadge from './HoloBadge'
  
<HoloBadge
  name="Javi A. Torres"
  title="Software Engineer"
  handle="javicodes"
  status="Online"
  contactText="Contact Me"
  avatarUrl="/path/to/avatar.jpg"
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={false}
  onContactClick={() => console.log('Contact clicked')}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
