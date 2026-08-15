import code from '@content/Animations/CheckerDissolve/CheckerDissolve.jsx?raw';
import css from '@content/Animations/CheckerDissolve/CheckerDissolve.css?raw';
import tailwind from '@tailwind/Animations/CheckerDissolve/CheckerDissolve.jsx?raw';
import tsCode from '@ts-default/Animations/CheckerDissolve/CheckerDissolve.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/CheckerDissolve/CheckerDissolve.tsx?raw';

export const checkerDissolve = {
  dependencies: `gsap`,
  usage: `import CheckerDissolve from './CheckerDissolve';

<CheckerDissolve
  firstContent={
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
      alt="default pixel transition content, a cat!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#111"
      }}
    >
      <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
    </div>
  }
  gridSize={12}
  pixelColor='#ffffff'
  once={false}
  animationStepDuration={0.4}
  className="custom-pixel-card"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
