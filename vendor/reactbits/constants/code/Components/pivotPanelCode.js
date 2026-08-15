import code from '@content/Components/PivotPanel/PivotPanel.jsx?raw';
import css from '@content/Components/PivotPanel/PivotPanel.css?raw';
import tailwind from '@tailwind/Components/PivotPanel/PivotPanel.jsx?raw';
import tsCode from '@ts-default/Components/PivotPanel/PivotPanel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/PivotPanel/PivotPanel.tsx?raw';

export const pivotPanel = {
  dependencies: `motion`,
  usage: `import PivotPanel from './PivotPanel';

<PivotPanel
  imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
  altText="Kendrick Lamar - GNX Album Cover"
  captionText="Kendrick Lamar - GNX"
  containerHeight="300px"
  containerWidth="300px"
  imageHeight="300px"
  imageWidth="300px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={true}
  displayOverlayContent={true}
  overlayContent={
    <p className="tilted-card-demo-text">
      Kendrick Lamar - GNX
    </p>
  }
/>
  `,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
