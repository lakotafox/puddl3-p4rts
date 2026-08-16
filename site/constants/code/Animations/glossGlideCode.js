import code from '@content/Animations/GlossGlide/GlossGlide.jsx?raw';
import css from '@content/Animations/GlossGlide/GlossGlide.css?raw';
import tailwind from '@tailwind/Animations/GlossGlide/GlossGlide.jsx?raw';
import tsCode from '@ts-default/Animations/GlossGlide/GlossGlide.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/GlossGlide/GlossGlide.tsx?raw';

export const glossGlide = {
  usage: `import GlossGlide from './GlossGlide'

<div style={{ height: '600px', position: 'relative' }}>
  <GlossGlide
    glareColor="#ffffff"
    glareOpacity={0.3}
    glareAngle={-30}
    glareSize={300}
    transitionDuration={800}
    playOnce={false}
  >
    <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#333', margin: 0 }}>
      Hover Me
    </h2>
  </GlossGlide>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
