import code from '@content/Components/RevealList/RevealList.jsx?raw';
import css from '@content/Components/RevealList/RevealList.css?raw';
import tailwind from '@tailwind/Components/RevealList/RevealList.jsx?raw';
import tsCode from '@ts-default/Components/RevealList/RevealList.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/RevealList/RevealList.tsx?raw';

export const revealList = {
  dependencies: `motion`,
  usage: `import RevealList from './RevealList'

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']; 
  
<RevealList
  items={items}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={true}
  enableArrowNavigation={true}
  displayScrollbar={true}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
