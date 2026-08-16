import code from '@content/Animations/FilmGrain/FilmGrain.jsx?raw';
import css from '@content/Animations/FilmGrain/FilmGrain.css?raw';
import tailwind from '@tailwind/Animations/FilmGrain/FilmGrain.jsx?raw';
import tsCode from '@ts-default/Animations/FilmGrain/FilmGrain.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/FilmGrain/FilmGrain.tsx?raw';

export const filmGrain = {
  usage: `import FilmGrain from './FilmGrain;'

<div style={{width: '600px', height: '400px', position: 'relative', overflow: 'hidden'}}>
  <FilmGrain
    patternSize={250}
    patternScaleX={1}
    patternScaleY={1}
    patternRefreshInterval={2}
    patternAlpha={15}
  />
</div>`,

  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
