import code from '@content/Animations/ChromeInk/ChromeInk.jsx?raw';
import css from '@content/Animations/ChromeInk/ChromeInk.css?raw';
import tailwind from '@tailwind/Animations/ChromeInk/ChromeInk.jsx?raw';
import tsCode from '@ts-default/Animations/ChromeInk/ChromeInk.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/ChromeInk/ChromeInk.tsx?raw';

export const chromeInk = {
  usage: `// Effect inspired by Paper's Liquid Metal effect
  
import ChromeInk from "./ChromeInk";

// Replace with your own SVG path
// NOTE: Your SVG should have padding around the shape to prevent cutoff
// It should have a black fill color to allow the metallic effect to show through
import logo from './logo.svg';

export default function Component() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ChromeInk
        imageSrc={logo}
        // Pattern
        seed={42}
        scale={4}
        patternSharpness={1}
        noiseScale={0.5}
        // Animation
        speed={0.3}
        liquid={0.75}
        mouseAnimation={false}
        // Visual
        brightness={2}
        contrast={0.5}
        refraction={0.01}
        blur={0.015}
        chromaticSpread={2}
        fresnel={1}
        angle={0}
        waveAmplitude={1}
        distortion={1}
        contour={0.2}
        // Colors
        lightColor="#ffffff"
        darkColor="#000000"
        tintColor="#feb3ff"
      />
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
