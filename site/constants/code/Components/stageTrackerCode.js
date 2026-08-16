import code from '@content/Components/StageTracker/StageTracker.jsx?raw';
import css from '@content/Components/StageTracker/StageTracker.css?raw';
import tailwind from '@tailwind/Components/StageTracker/StageTracker.jsx?raw';
import tsCode from '@ts-default/Components/StageTracker/StageTracker.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/StageTracker/StageTracker.tsx?raw';

export const stageTracker = {
  dependencies: `motion`,
  usage: `import StageTracker, { Step } from './StageTracker';
  
<StageTracker
  initialStep={1}
  onStepChange={(step) => {
    console.log(step);
  }}
  onFinalStepCompleted={() => console.log("All steps completed!")}
  backButtonText="Previous"
  nextButtonText="Next"
>
  <Step>
    <h2>Welcome to the PUDDL3 P4RTS stageTracker!</h2>
    <p>Check out the next step!</p>
  </Step>
  <Step>
    <h2>Step 2</h2>
    <img style={{ height: '100px', width: '100%', objectFit: 'cover', objectPosition: 'center -70px', borderRadius: '15px', marginTop: '1em' }} src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" />
    <p>Custom step content!</p>
  </Step>
  <Step>
    <h2>How about an input?</h2>
    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
  </Step>
  <Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step>
</StageTracker>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
