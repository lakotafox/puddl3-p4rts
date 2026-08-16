/**
 * @typedef {'Animations' | 'Backgrounds' | 'Components' | 'TextAnimations'} Category
 */
/**
 * The supported code/component variants for the registry system.
 *
 * @type {readonly ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW']}
 */
export const VARIANTS = ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'];

/**
 * @typedef {'JS-CSS' | 'JS-TW' | 'TS-CSS' | 'TS-TW'} Variant
 */

/**
 * Type for all component metadata, including enforcement of the Category field.
 *
 * @typedef {Object} ComponentMetadata
 * @property {string} videoUrl
 * @property {string} description
 * @property {Category} category
 * @property {string} name
 * @property {string} docsUrl
 * @property {string[]} tags
 * @property {Variant[]} [variants]
 * @property {Record<string, any>} [meta]
 */

/**
 * @type {Record<string, ComponentMetadata>}
 */
export const componentMetadata = {

  //! Animations -------------------------------------------------------------------------------------------------------------------------------

  'Animations/MotionWrap': {
    videoUrl: '/assets/video/animatedcontent.webm',
    description: 'Wrapper that animates any children on scroll or mount with configurable direction, distance, duration, easing and disappear options.',
    category: 'Animations',
    name: 'MotionWrap',
    docsUrl: 'https://reactbits.dev/animations/animated-content',
    tags: []
  },
  'Animations/GooPointer': {
    videoUrl: '/assets/video/blobcursor.webm',
    description: 'Organic blob cursor that smoothly follows the pointer with inertia and elastic morphing.',
    category: 'Animations',
    name: 'GooPointer',
    docsUrl: 'https://reactbits.dev/animations/blob-cursor',
    tags: []
  },
  'Animations/TapBurst': {
    videoUrl: '/assets/video/clickspark.webm',
    description: 'Creates particle spark bursts at click position.',
    category: 'Animations',
    name: 'TapBurst',
    docsUrl: 'https://reactbits.dev/animations/click-spark',
    tags: []
  },
  'Animations/Reticle': {
    videoUrl: '/assets/video/crosshair.webm',
    description: 'Custom crosshair cursor with tracking, and link hover effects.',
    category: 'Animations',
    name: 'Reticle',
    docsUrl: 'https://reactbits.dev/animations/crosshair',
    tags: []
  },
  'Animations/VoxelCluster': {
    videoUrl: '/assets/video/cubes.webm',
    description: '3D rotating cube cluster. Supports auto-rotation or hover interaction.',
    category: 'Animations',
    name: 'VoxelCluster',
    docsUrl: 'https://reactbits.dev/animations/cubes',
    tags: []
  },
  'Animations/VoltageFrame': {
    videoUrl: '/assets/video/electricborder.webm',
    description: 'Jittery electric energy border with animated arcs, glow and adjustable intensity.',
    category: 'Animations',
    name: 'VoltageFrame',
    docsUrl: 'https://reactbits.dev/animations/electric-border',
    tags: []
  },
  'Animations/SoftEntrance': {
    videoUrl: '/assets/video/fadecontent.webm',
    description: 'Simple directional fade / slide entrance / exit wrapper with threshold-based activation.',
    category: 'Animations',
    name: 'SoftEntrance',
    docsUrl: 'https://reactbits.dev/animations/fade-content',
    tags: []
  },
  'Animations/GlossGlide': {
    videoUrl: '/assets/video/glarehover.webm',
    description: 'Adds a realistic moving glare highlight on hover over any element.',
    category: 'Animations',
    name: 'GlossGlide',
    docsUrl: 'https://reactbits.dev/animations/glare-hover',
    tags: []
  },
  'Animations/FocusPull': {
    videoUrl: '/assets/video/gradualblur.webm',
    description: 'Progressively un-blurs content based on scroll or trigger creating a cinematic reveal.',
    category: 'Animations',
    name: 'FocusPull',
    docsUrl: 'https://reactbits.dev/animations/gradual-blur',
    tags: []
  },
  'Animations/PhantomPointer': {
    videoUrl: '/assets/video/ghostcursor.webm',
    description: 'Semi-transparent ghost cursor that smoothly follows the real cursor with a trailing effect.',
    category: 'Animations',
    name: 'PhantomPointer',
    docsUrl: 'https://reactbits.dev/animations/ghost-cursor',
    tags: []
  },
  'Animations/PhotoWake': {
    videoUrl: '/assets/video/imagetrail.webm',
    description: 'Cursor-based image trail with several built-in variants.',
    category: 'Animations',
    name: 'PhotoWake',
    docsUrl: 'https://reactbits.dev/animations/image-trail',
    tags: []
  },
  'Animations/BrandMarquee': {
    videoUrl: '/assets/video/logoloop.webm',
    description: 'Continuously looping marquee of brand or tech logos with seamless repeat and hover pause.',
    category: 'Animations',
    name: 'BrandMarquee',
    docsUrl: 'https://reactbits.dev/animations/logo-loop',
    tags: []
  },
  'Animations/PointerPull': {
    videoUrl: '/assets/video/magnet.webm',
    description: 'Elements magnetically ease toward the cursor then settle back with spring physics.',
    category: 'Animations',
    name: 'PointerPull',
    docsUrl: 'https://reactbits.dev/animations/magnet',
    tags: []
  },
  'Animations/CompassField': {
    videoUrl: '/assets/video/magnetlines.webm',
    description: 'Animated field lines bend toward the cursor.',
    category: 'Animations',
    name: 'CompassField',
    docsUrl: 'https://reactbits.dev/animations/magnet-lines',
    tags: []
  },
  'Animations/BlobFusion': {
    videoUrl: '/assets/video/metaballs.webm',
    description: 'Liquid metaball blobs that merge and separate with smooth implicit surface animation.',
    category: 'Animations',
    name: 'BlobFusion',
    docsUrl: 'https://reactbits.dev/animations/meta-balls',
    tags: []
  },
  'Animations/FilamentWeave': {
    videoUrl: '/assets/video/strands.webm',
    description: 'Glowing ribbon-like strands that ripple and weave across a transparent canvas.',
    category: 'Animations',
    name: 'FilamentWeave',
    docsUrl: 'https://reactbits.dev/animations/strands',
    tags: []
  },
  'Animations/ChromeInk': {
    videoUrl: '/assets/video/metallicpaint.webm',
    description: 'Liquid metallic paint shader which can be applied to SVG elements.',
    category: 'Animations',
    name: 'ChromeInk',
    docsUrl: 'https://reactbits.dev/animations/metallic-paint',
    tags: []
  },
  'Animations/FilmGrain': {
    videoUrl: '/assets/video/noise.webm',
    description: 'Animated film grain / noise overlay adding subtle texture and motion.',
    category: 'Animations',
    name: 'FilmGrain',
    docsUrl: 'https://reactbits.dev/animations/noise',
    tags: []
  },
  'Animations/SquareWake': {
    videoUrl: '/assets/video/pixeltrail.webm',
    description: 'Pixelated cursor trail emitting fading squares with retro digital feel.',
    category: 'Animations',
    name: 'SquareWake',
    docsUrl: 'https://reactbits.dev/animations/pixel-trail',
    tags: []
  },
  'Animations/CheckerDissolve': {
    videoUrl: '/assets/video/pixeltransition.webm',
    description: 'Pixel dissolve transition for content reveal on hover.',
    category: 'Animations',
    name: 'CheckerDissolve',
    docsUrl: 'https://reactbits.dev/animations/pixel-transition',
    tags: []
  },
  'Animations/ShardSwitch': {
    videoUrl: '/assets/video/pixelswap.webm',
    description: 'Pixel fragments assemble into a full cover, swap arbitrary content, then dissolve away with reversible colors and triggers.',
    category: 'Animations',
    name: 'ShardSwitch',
    docsUrl: 'https://reactbits.dev/animations/pixel-swap',
    tags: []
  },
  'Animations/Streamers': {
    videoUrl: '/assets/video/ribbons.webm',
    description: 'Flowing responsive ribbons/cursor trail driven by physics and pointer motion.',
    category: 'Animations',
    name: 'Streamers',
    docsUrl: 'https://reactbits.dev/animations/ribbons',
    tags: []
  },
  'Animations/HazyMorph': {
    videoUrl: '/assets/video/shapeblur.webm',
    description: 'Morphing blurred geometric shape. The effect occurs on hover.',
    category: 'Animations',
    name: 'HazyMorph',
    docsUrl: 'https://reactbits.dev/animations/shape-blur',
    tags: []
  },
  'Animations/RipplePointer': {
    videoUrl: '/assets/video/splashcursor.webm',
    description: 'Liquid splash burst at cursor with curling ripples and waves.',
    category: 'Animations',
    name: 'RipplePointer',
    docsUrl: 'https://reactbits.dev/animations/splash-cursor',
    tags: []
  },
  'Animations/TwinkleFrame': {
    videoUrl: '/assets/video/starborder.webm',
    description: 'Animated star / sparkle border orbiting content with twinkle pulses.',
    category: 'Animations',
    name: 'TwinkleFrame',
    docsUrl: 'https://reactbits.dev/animations/star-border',
    tags: []
  },
  'Animations/DecalLift': {
    videoUrl: '/assets/video/stickerpeel.webm',
    description: 'Sticker corner lift + peel interaction using 3D transform and shadow depth.',
    category: 'Animations',
    name: 'DecalLift',
    docsUrl: 'https://reactbits.dev/animations/sticker-peel',
    tags: []
  },
  'Animations/LockOnPointer': {
    videoUrl: '/assets/video/targetcursor.webm',
    description: 'A cursor follow animation with 4 corners that lock onto targets.',
    category: 'Animations',
    name: 'LockOnPointer',
    docsUrl: 'https://reactbits.dev/animations/target-cursor',
    tags: []
  },
  'Animations/BeamCascade': {
    videoUrl: '/assets/video/laserflow.webm',
    description: 'Dynamic laser light that flows onto a surface, customizable effect.',
    category: 'Animations',
    name: 'BeamCascade',
    docsUrl: 'https://reactbits.dev/animations/laser-flow',
    tags: []
  },
  'Animations/RepelField': {
    videoUrl: '/assets/video/antigravity.webm',
    description: '3D antigravity particle field that repels from the cursor with smooth motion.',
    category: 'Animations',
    name: 'RepelField',
    docsUrl: 'https://reactbits.dev/animations/antigravity',
    tags: []
  },
  'Animations/PhotoSatellites': {
    videoUrl: '/assets/video/orbitimages.webm',
    description: 'SVG Path customizable orbiting images effect',
    category: 'Animations',
    name: 'PhotoSatellites',
    docsUrl: 'https://reactbits.dev/animations/orbit-images',
    tags: []
  },
  'Animations/ArcaneHalos': {
    videoUrl: '/assets/video/magicrings.webm',
    description: 'Interactive magic rings effect with customizable parameters.',
    category: 'Animations',
    name: 'ArcaneHalos',
    docsUrl: 'https://reactbits.dev/animations/magic-rings',
    tags: []
  },

  //! Text Animations -------------------------------------------------------------------------------------------------------------------------------

  'TextAnimations/TerminalType': {
    videoUrl: '/assets/video/asciitext.webm',
    description: 'Renders text with an animated ASCII background for a retro feel.',
    category: 'TextAnimations',
    name: 'ASCIIText',
    docsUrl: 'https://reactbits.dev/text-animations/ascii-text',
    tags: []
  },
  'TextAnimations/SharpenType': {
    videoUrl: '/assets/video/blurtext.webm',
    description: 'Text starts blurred then crisply resolves for a soft-focus reveal effect.',
    category: 'TextAnimations',
    name: 'SharpenType',
    docsUrl: 'https://reactbits.dev/text-animations/blur-text',
    tags: []
  },
  'TextAnimations/ArcType': {
    videoUrl: '/assets/video/circulartext.webm',
    description: 'Layouts characters around a circle with optional rotation animation.',
    category: 'TextAnimations',
    name: 'ArcType',
    docsUrl: 'https://reactbits.dev/text-animations/circular-text',
    tags: []
  },
  'TextAnimations/TallyClimb': {
    videoUrl: '/assets/video/countup.webm',
    description: 'Animated number counter supporting formatting and decimals.',
    category: 'TextAnimations',
    name: 'TallyClimb',
    docsUrl: 'https://reactbits.dev/text-animations/count-up',
    tags: []
  },
  'TextAnimations/RibbonMarquee': {
    videoUrl: '/assets/video/curvedloop.webm',
    description: 'Flowing looping text path along a customizable curve with drag interaction.',
    category: 'TextAnimations',
    name: 'RibbonMarquee',
    docsUrl: 'https://reactbits.dev/text-animations/curved-loop',
    tags: []
  },
  'TextAnimations/CipherReveal': {
    videoUrl: '/assets/video/decryptedtext.webm',
    description: 'Hacker-style decryption cycling random glyphs until resolving to real text.',
    category: 'TextAnimations',
    name: 'CipherReveal',
    docsUrl: 'https://reactbits.dev/text-animations/decrypted-text',
    tags: []
  },
  'TextAnimations/GravityLetters': {
    videoUrl: '/assets/video/fallingtext.webm',
    description: 'Characters fall with gravity + bounce creating a playful entrance.',
    category: 'TextAnimations',
    name: 'GravityLetters',
    docsUrl: 'https://reactbits.dev/text-animations/falling-text',
    tags: []
  },
  'TextAnimations/TremorType': {
    videoUrl: '/assets/video/fuzzytext.webm',
    description: 'Vibrating fuzzy text with controllable hover intensity.',
    category: 'TextAnimations',
    name: 'TremorType',
    docsUrl: 'https://reactbits.dev/text-animations/fuzzy-text',
    tags: []
  },
  'TextAnimations/StaticType': {
    videoUrl: '/assets/video/glitchtext.webm',
    description: 'RGB split and distortion glitch effect with jitter effects.',
    category: 'TextAnimations',
    name: 'StaticType',
    docsUrl: 'https://reactbits.dev/text-animations/glitch-text',
    tags: []
  },
  'TextAnimations/RainbowType': {
    videoUrl: '/assets/video/gradienttext.webm',
    description: 'Animated gradient sweep across live text with speed and color control.',
    category: 'TextAnimations',
    name: 'RainbowType',
    docsUrl: 'https://reactbits.dev/text-animations/gradient-text',
    tags: []
  },
  'TextAnimations/PhraseFlip': {
    videoUrl: '/assets/video/rotatingtext.webm',
    description: 'Cycles through multiple phrases with 3D rotate / flip transitions.',
    category: 'TextAnimations',
    name: 'PhraseFlip',
    docsUrl: 'https://reactbits.dev/text-animations/rotating-text',
    tags: []
  },
  'TextAnimations/SmudgeType': {
    videoUrl: '/assets/video/scrambledtext.webm',
    description: 'Detects cursor position and applies a distortion effect to text.',
    category: 'TextAnimations',
    name: 'SmudgeType',
    docsUrl: 'https://reactbits.dev/text-animations/scrambled-text',
    tags: []
  },
  'TextAnimations/ParallaxLift': {
    videoUrl: '/assets/video/scrollfloat.webm',
    description: 'Text gently floats / parallax shifts on scroll.',
    category: 'TextAnimations',
    name: 'ParallaxLift',
    docsUrl: 'https://reactbits.dev/text-animations/scroll-float',
    tags: []
  },
  'TextAnimations/IntoFocus': {
    videoUrl: '/assets/video/scrollreveal.webm',
    description: 'Text gently unblurs and reveals on scroll.',
    category: 'TextAnimations',
    name: 'IntoFocus',
    docsUrl: 'https://reactbits.dev/text-animations/scroll-reveal',
    tags: []
  },
  'TextAnimations/MomentumMarquee': {
    videoUrl: '/assets/video/scrollvelocity.webm',
    description: "Text marquee animatio - speed and distortion scale with user's scroll velocity.",
    category: 'TextAnimations',
    name: 'MomentumMarquee',
    docsUrl: 'https://reactbits.dev/text-animations/scroll-velocity',
    tags: []
  },
  'TextAnimations/SheenSweep': {
    videoUrl: '/assets/video/shinytext.webm',
    description: 'Metallic sheen sweeps across text producing a reflective highlight.',
    category: 'TextAnimations',
    name: 'SheenSweep',
    docsUrl: 'https://reactbits.dev/text-animations/shiny-text',
    tags: []
  },
  'TextAnimations/LetterBreak': {
    videoUrl: '/assets/video/splittext.webm',
    description: 'Splits text into characters / words for staggered entrance animation.',
    category: 'TextAnimations',
    name: 'LetterBreak',
    docsUrl: 'https://reactbits.dev/text-animations/split-text',
    tags: []
  },
  'TextAnimations/WordTrail': {
    videoUrl: '/assets/video/textcursor.webm',
    description: 'Make any text element follow your cursor, leaving a trail of copies behind it.',
    category: 'TextAnimations',
    name: 'WordTrail',
    docsUrl: 'https://reactbits.dev/text-animations/text-cursor',
    tags: []
  },
  'TextAnimations/SquishType': {
    videoUrl: '/assets/video/textpressure.webm',
    description: 'Characters scale / warp interactively based on pointer pressure zone.',
    category: 'TextAnimations',
    name: 'SquishType',
    docsUrl: 'https://reactbits.dev/text-animations/text-pressure',
    tags: []
  },
  'TextAnimations/KeystrokeReveal': {
    videoUrl: '/assets/video/texttype.webm',
    description: 'Typewriter effect with blinking cursor and adjustable typing cadence.',
    category: 'TextAnimations',
    name: 'KeystrokeReveal',
    docsUrl: 'https://reactbits.dev/text-animations/text-type',
    tags: []
  },
  'TextAnimations/BlurRelay': {
    videoUrl: '/assets/video/truefocus.webm',
    description: 'Applies dynamic blur / clarity based over a series of words in order.',
    category: 'TextAnimations',
    name: 'BlurRelay',
    docsUrl: 'https://reactbits.dev/text-animations/true-focus',
    tags: []
  },
  'TextAnimations/MagneticInk': {
    videoUrl: '/assets/video/variableproximity.webm',
    description: 'Letter styling changes continuously with pointer distance mapping.',
    category: 'TextAnimations',
    name: 'MagneticInk',
    docsUrl: 'https://reactbits.dev/text-animations/variable-proximity',
    tags: []
  },
  'TextAnimations/RiffleType': {
    videoUrl: '/assets/video/shuffle.webm',
    description: 'Animated text reveal where characters shuffle before settling.',
    category: 'TextAnimations',
    name: 'RiffleType',
    docsUrl: 'https://reactbits.dev/text-animations/shuffle',
    tags: []
  },
  'TextAnimations/DustType': {
    videoUrl: '/assets/video/particletext.webm',
    description: 'Text assembles from drifting particles that scatter and reform on demand.',
    category: 'TextAnimations',
    name: 'DustType',
    docsUrl: 'https://reactbits.dev/text-animations/particle-text',
    tags: []
  },
  'TextAnimations/DepartureBoard': {
    videoUrl: '/assets/video/splitflaptext.webm',
    description: 'Mechanical split-flap departure board that clacks through to each new phrase.',
    category: 'TextAnimations',
    name: 'DepartureBoard',
    docsUrl: 'https://reactbits.dev/text-animations/split-flap-text',
    tags: []
  },
  'TextAnimations/LiquidLetters': {
    videoUrl: '/assets/video/warptext.webm',
    description: 'WebGL warp that bends and refracts the text around the pointer.',
    category: 'TextAnimations',
    name: 'LiquidLetters',
    docsUrl: 'https://reactbits.dev/text-animations/warp-text',
    tags: []
  },
  'TextAnimations/OutlineInk': {
    videoUrl: '/assets/video/stroketext.webm',
    description: 'Outlined letterforms draw themselves on, then flood with fill.',
    category: 'TextAnimations',
    name: 'OutlineInk',
    docsUrl: 'https://reactbits.dev/text-animations/stroke-text',
    tags: []
  },
  'TextAnimations/ExtrudedType': {
    videoUrl: '/assets/video/depthtext.webm',
    description: 'Layered extruded type with parallax that shifts against the pointer.',
    category: 'TextAnimations',
    name: 'ExtrudedType',
    docsUrl: 'https://reactbits.dev/text-animations/depth-text',
    tags: []
  },
  'TextAnimations/OrigamiType': {
    videoUrl: '/assets/video/foldtext.webm',
    description: 'Lines unfold into place like creased paper opening flat.',
    category: 'TextAnimations',
    name: 'OrigamiType',
    docsUrl: 'https://reactbits.dev/text-animations/fold-text',
    tags: []
  },
  'TextAnimations/AfterimageType': {
    videoUrl: '/assets/video/echotext.webm',
    description: 'Ghosted copies trail behind the text and settle into a single word.',
    category: 'TextAnimations',
    name: 'AfterimageType',
    docsUrl: 'https://reactbits.dev/text-animations/echo-text',
    tags: []
  },
  'TextAnimations/StencilTitle': {
    videoUrl: '/assets/video/maskedheading.webm',
    description: 'A large headline with a drifting colour mesh or image showing through the glyphs, revealed word by word.',
    category: 'TextAnimations',
    name: 'StencilTitle',
    docsUrl: 'https://reactbits.dev/text-animations/masked-heading',
    tags: []
  },
  'TextAnimations/PathMarquee': {
    videoUrl: '/assets/video/textloop.webm',
    description: 'A seamless text marquee that flows along curved SVG paths.',
    category: 'TextAnimations',
    name: 'PathMarquee',
    docsUrl: 'https://reactbits.dev/text-animations/text-loop',
    tags: []
  },

  //! Components -------------------------------------------------------------------------------------------------------------------------------
  'Components/RevealList': {
    videoUrl: '/assets/video/animatedlist.webm',
    description: 'List items enter with staggered motion variants for polished reveals.',
    category: 'Components',
    name: 'RevealList',
    docsUrl: 'https://reactbits.dev/components/animated-list',
    tags: []
  },
  'Components/SpringDeck': {
    videoUrl: '/assets/video/bouncecards.webm',
    description: 'Cards bounce that bounce in on mount.',
    category: 'Components',
    name: 'SpringDeck',
    docsUrl: 'https://reactbits.dev/components/bounce-cards',
    tags: []
  },
  'Components/BloomNav': {
    videoUrl: '/assets/video/bubblemenu.webm',
    description: 'Floating circular expanding menu with staggered item reveal.',
    category: 'Components',
    name: 'BloomNav',
    docsUrl: 'https://reactbits.dev/components/bubble-menu',
    tags: []
  },
  'Components/PanelNav': {
    videoUrl: '/assets/video/cardnav.webm',
    description: 'Expandable navigation bar with card panels revealing nested links.',
    category: 'Components',
    name: 'PanelNav',
    docsUrl: 'https://reactbits.dev/components/card-nav',
    tags: []
  },
  'Components/DeckCycle': {
    videoUrl: '/assets/video/cardswap.webm',
    description: 'Cards animate position swapping with smooth layout transitions.',
    category: 'Components',
    name: 'DeckCycle',
    docsUrl: 'https://reactbits.dev/components/card-swap',
    tags: []
  },
  'Components/SwipeReel': {
    videoUrl: '/assets/video/carousel.webm',
    description: 'Responsive carousel with touch gestures, looping and transitions.',
    category: 'Components',
    name: 'SwipeReel',
    docsUrl: 'https://reactbits.dev/components/carousel',
    tags: []
  },
  'Components/HueTiles': {
    videoUrl: '/assets/video/chromagrid.webm',
    description: 'A responsive grid of grayscale tiles. Hovering the grid reaveals their colors.',
    category: 'Components',
    name: 'HueTiles',
    docsUrl: 'https://reactbits.dev/components/chroma-grid',
    tags: []
  },
  'Components/PerspectiveRail': {
    videoUrl: '/assets/video/depthcarousel.webm',
    description: 'Cards recede into depth on a 3D rail, with drag, keyboard and auto-advance.',
    category: 'Components',
    name: 'PerspectiveRail',
    docsUrl: 'https://reactbits.dev/components/depth-carousel',
    tags: []
  },
  'Components/ConcertinaPanels': {
    videoUrl: '/assets/video/accordiongallery.webm',
    description: 'Panels expand on hover or focus, revealing parallax imagery and captions.',
    category: 'Components',
    name: 'ConcertinaPanels',
    docsUrl: 'https://reactbits.dev/components/accordion-gallery',
    tags: []
  },
  'Components/MeltReel': {
    videoUrl: '/assets/video/morphslider.webm',
    description: 'WebGL slider that melts between images with a displacement transition.',
    category: 'Components',
    name: 'MeltReel',
    docsUrl: 'https://reactbits.dev/components/morph-slider',
    tags: []
  },
  'Components/TileStream': {
    videoUrl: '/assets/video/driftwall.webm',
    description: 'An endless perspective wall of tiles drifting past, lifting on hover.',
    category: 'Components',
    name: 'TileStream',
    docsUrl: 'https://reactbits.dev/components/drift-wall',
    tags: []
  },
  'Components/RingReel': {
    videoUrl: '/assets/video/circulargallery.webm',
    description: 'Circular orbit gallery rotating images.',
    category: 'Components',
    name: 'RingReel',
    docsUrl: 'https://reactbits.dev/components/circular-gallery',
    tags: []
  },
  'Components/DigitRoll': {
    videoUrl: '/assets/video/counter.webm',
    description: 'Flexible animated counter supporting increments + easing.',
    category: 'Components',
    name: 'DigitRoll',
    docsUrl: 'https://reactbits.dev/components/counter',
    tags: []
  },
  'Components/DissolvePanel': {
    videoUrl: '/assets/video/decaycard.webm',
    description: 'Hover parallax effect that disintegrates the content of a card.',
    category: 'Components',
    name: 'DissolvePanel',
    docsUrl: 'https://reactbits.dev/components/decay-card',
    tags: []
  },
  'Components/ZoomShelf': {
    videoUrl: '/assets/video/dock.webm',
    description: 'macOS style magnifying dock with proximity scaling of icons.',
    category: 'Components',
    name: 'ZoomShelf',
    docsUrl: 'https://reactbits.dev/components/dock',
    tags: []
  },
  'Components/HemisphereGallery': {
    videoUrl: '/assets/video/domegallery.webm',
    description: 'Immersive 3D dome gallery projecting images on a hemispheric surface.',
    category: 'Components',
    name: 'HemisphereGallery',
    docsUrl: 'https://reactbits.dev/components/dome-gallery',
    tags: []
  },
  'Components/RubberRange': {
    videoUrl: '/assets/video/elasticslider.webm',
    description: 'Slider handle stretches elastically then snaps with spring physics.',
    category: 'Components',
    name: 'RubberRange',
    docsUrl: 'https://reactbits.dev/components/elastic-slider',
    tags: []
  },
  'Components/LiquidNav': {
    videoUrl: '/assets/video/flowingmenu.webm',
    description: 'Liquid flowing active indicator glides between menu items.',
    category: 'Components',
    name: 'LiquidNav',
    docsUrl: 'https://reactbits.dev/components/flowing-menu',
    tags: []
  },
  'Components/LiquidPane': {
    videoUrl: '/assets/video/fluidglass.webm',
    description: 'Glassmorphism container with animated liquid distortion refraction.',
    category: 'Components',
    name: 'LiquidPane',
    docsUrl: 'https://reactbits.dev/components/fluid-glass',
    tags: []
  },
  'Components/BillboardStream': {
    videoUrl: '/assets/video/flyingposters.webm',
    description: '3D posters rotate on scroll infinitely.',
    category: 'Components',
    name: 'BillboardStream',
    docsUrl: 'https://reactbits.dev/components/flying-posters',
    tags: []
  },
  'Components/Dossier': {
    videoUrl: '/assets/video/folder.webm',
    description: 'Interactive folder opens to reveal nested content smooth motion.',
    category: 'Components',
    name: 'Dossier',
    docsUrl: 'https://reactbits.dev/components/folder',
    tags: []
  },
  'Components/FrostedGlyphs': {
    videoUrl: '/assets/video/glassicons.webm',
    description: 'Icon set styled with frosted glass blur.',
    category: 'Components',
    name: 'FrostedGlyphs',
    docsUrl: 'https://reactbits.dev/components/glass-icons',
    tags: []
  },
  'Components/CrystalPanel': {
    videoUrl: '/assets/video/glasssurface.webm',
    description: 'Advanced Apple-style glass surface with real-time distortion + lighting.',
    category: 'Components',
    name: 'CrystalPanel',
    docsUrl: 'https://reactbits.dev/components/glass-surface',
    tags: []
  },
  'Components/TaffyTabs': {
    videoUrl: '/assets/video/gooeynav.webm',
    description: 'Navigation indicator morphs with gooey blob transitions between items.',
    category: 'Components',
    name: 'TaffyTabs',
    docsUrl: 'https://reactbits.dev/components/gooey-nav',
    tags: []
  },
  'Components/EndlessRail': {
    videoUrl: '/assets/video/infinitemenu.webm',
    description: 'Horizontally looping menu effect that scrolls endlessly with seamless wrap.',
    category: 'Components',
    name: 'EndlessRail',
    docsUrl: 'https://reactbits.dev/components/infinite-menu',
    tags: []
  },
  'Components/BadgeSwing': {
    videoUrl: '/assets/video/lanyard.webm',
    description: 'Swinging 3D lanyard / badge card with realistic inertial motion.',
    category: 'Components',
    name: 'BadgeSwing',
    docsUrl: 'https://reactbits.dev/components/lanyard',
    tags: []
  },
  'Components/SparkTiles': {
    videoUrl: '/assets/video/magicbento.webm',
    description: 'Interactive bento grid tiles expand + animate with various options.',
    category: 'Components',
    name: 'SparkTiles',
    docsUrl: 'https://reactbits.dev/components/magic-bento',
    tags: []
  },
  'Components/PatchworkGrid': {
    videoUrl: '/assets/video/masonry.webm',
    description: 'Responsive masonry layout with animated reflow + gaps optimization.',
    category: 'Components',
    name: 'PatchworkGrid',
    docsUrl: 'https://reactbits.dev/components/masonry',
    tags: []
  },
  'Components/OrbitStage': {
    videoUrl: '/assets/video/modelviewer.webm',
    description: 'Three.js model viewer with orbit controls and lighting presets.',
    category: 'Components',
    name: 'OrbitStage',
    docsUrl: 'https://reactbits.dev/components/model-viewer',
    tags: []
  },
  'Components/CapsuleTabs': {
    videoUrl: '/assets/video/pillnav.webm',
    description: 'Minimal pill nav with sliding active highlight + smooth easing.',
    category: 'Components',
    name: 'CapsuleTabs',
    docsUrl: 'https://reactbits.dev/components/pill-nav',
    tags: []
  },
  'Components/BitmapPanel': {
    videoUrl: '/assets/video/pixelcard.webm',
    description: 'Card content revealed through pixel expansion transition.',
    category: 'Components',
    name: 'BitmapPanel',
    docsUrl: 'https://reactbits.dev/components/pixel-card',
    tags: []
  },
  'Components/HoloBadge': {
    videoUrl: '/assets/video/profilecard.webm',
    description: 'Animated profile card glare with 3D hover effect.',
    category: 'Components',
    name: 'HoloBadge',
    docsUrl: 'https://reactbits.dev/components/profile-card',
    tags: []
  },
  'Components/PinDeck': {
    videoUrl: '/assets/video/scrollstack.webm',
    description: 'Overlapping card stack reveals on scroll with depth layering.',
    category: 'Components',
    name: 'PinDeck',
    docsUrl: 'https://reactbits.dev/components/scroll-stack',
    tags: []
  },
  'Components/BeaconTile': {
    videoUrl: '/assets/video/spotlightcard.webm',
    description: 'Dynamic spotlight follows cursor casting gradient illumination.',
    category: 'Components',
    name: 'BeaconTile',
    docsUrl: 'https://reactbits.dev/components/spotlight-card',
    tags: []
  },
  'Components/HaloEdge': {
    videoUrl: '/assets/video/borderglow.webm',
    description: 'Glowing mesh-gradient border that follows cursor direction and intensifies near edges.',
    category: 'Components',
    name: 'HaloEdge',
    docsUrl: 'https://reactbits.dev/components/border-glow',
    tags: []
  },
  'Components/ProximityNav': {
    videoUrl: '/assets/video/linesidebar.webm',
    description: 'Static list navigation with a cursor-proximity effect that shifts and highlights nearby items.',
    category: 'Components',
    name: 'ProximityNav',
    docsUrl: 'https://reactbits.dev/components/line-sidebar',
    tags: []
  },
  'Components/ChoiceDial': {
    videoUrl: '/assets/video/optionwheel.webm',
    description: 'Curved option picker that spins via scroll, drag, or arrow keys, fading and tilting items away from the selection.',
    category: 'Components',
    name: 'ChoiceDial',
    docsUrl: 'https://reactbits.dev/components/option-wheel',
    tags: []
  },
  'Components/RimlightButton': {
    videoUrl: '/assets/video/specularbutton.webm',
    description: 'Glass button with a shader-driven specular rim light that sweeps around the edge and follows the cursor.',
    category: 'Components',
    name: 'RimlightButton',
    docsUrl: 'https://reactbits.dev/components/specular-button',
    tags: []
  },
  'Animations/SpringFabric': {
    videoUrl: '/assets/video/elasticmesh.webm',
    description: 'Spring-mesh surface that stretches under the pointer and settles back with damped physics.',
    category: 'Animations',
    name: 'SpringFabric',
    docsUrl: 'https://reactbits.dev/animations/elastic-mesh',
    tags: []
  },
  'Animations/WaterWarp': {
    videoUrl: '/assets/video/rippledistortion.webm',
    description: 'Pointer-driven water displacement that warps content and leaves a decaying wake.',
    category: 'Animations',
    name: 'WaterWarp',
    docsUrl: 'https://reactbits.dev/animations/ripple-distortion',
    tags: []
  },
  'Animations/FlockPointer': {
    videoUrl: '/assets/video/swarmcursor.webm',
    description: 'Flocking particle swarm that chases the pointer, jostles for space and drifts apart at rest.',
    category: 'Animations',
    name: 'FlockPointer',
    docsUrl: 'https://reactbits.dev/animations/swarm-cursor',
    tags: []
  },
  'Animations/NewsprintLens': {
    videoUrl: '/assets/video/halftonereveal.webm',
    description: 'Print-style halftone dot matrix that resolves into sharp content around the cursor.',
    category: 'Animations',
    name: 'NewsprintLens',
    docsUrl: 'https://reactbits.dev/animations/halftone-reveal',
    tags: []
  },
  'Animations/FrameBloom': {
    videoUrl: '/assets/video/scrollexpand.webm',
    description: 'A rounded media frame that grows to full bleed as it scrolls through the viewport.',
    category: 'Animations',
    name: 'FrameBloom',
    docsUrl: 'https://reactbits.dev/animations/scroll-expand',
    tags: []
  },
  'Animations/PointerCells': {
    videoUrl: '/assets/video/cursorgrid.webm',
    description: 'Canvas grid whose cells light up around the cursor with configurable radius, falloff and click pulses.',
    category: 'Animations',
    name: 'PointerCells',
    docsUrl: 'https://reactbits.dev/animations/cursor-grid',
    tags: []
  },
  'Components/ArcField': {
    videoUrl: '/assets/video/curvedinput.webm',
    description: 'Arc-bent input bar with text, caret and submit button all following the curve.',
    category: 'Components',
    name: 'ArcField',
    docsUrl: 'https://reactbits.dev/components/curved-input',
    tags: []
  },
  'Components/SwipeDeck': {
    videoUrl: '/assets/video/stack.webm',
    description: 'Layered stack with swipe animations, autoplay and smooth transitions.',
    category: 'Components',
    name: 'SwipeDeck',
    docsUrl: 'https://reactbits.dev/components/stack',
    tags: []
  },
  'Components/StageTracker': {
    videoUrl: '/assets/video/stepper.webm',
    description: 'Animated multi-step progress indicator with active state transitions.',
    category: 'Components',
    name: 'StageTracker',
    docsUrl: 'https://reactbits.dev/components/stepper',
    tags: []
  },
  'Components/PivotPanel': {
    videoUrl: '/assets/video/tiltedcard.webm',
    description: '3D perspective tilt card reacting to pointer.',
    category: 'Components',
    name: 'PivotPanel',
    docsUrl: 'https://reactbits.dev/components/tilted-card',
    tags: []
  },
  'Components/WaterfallNav': {
    videoUrl: '/assets/video/staggeredmenu.webm',
    description: 'Menu with staggered item animations and smooth transitions on open/close.',
    category: 'Components',
    name: 'WaterfallNav',
    docsUrl: 'https://reactbits.dev/components/staggered-menu',
    tags: []
  },
  'Components/MirrorPane': {
    videoUrl: '/assets/video/reflectivecard.webm',
    description: 'Card with dynamic webcam reflection and glare effects that respond to cursor movement.',
    category: 'Components',
    name: 'MirrorPane',
    docsUrl: 'https://reactbits.dev/components/reflective-card',
    tags: []
  },

  //! Backgrounds -------------------------------------------------------------------------------------------------------------------------------
  'Backgrounds/PolarGlow': {
    videoUrl: '/assets/video/aurora.webm',
    description: 'Flowing aurora gradient background.',
    category: 'Backgrounds',
    name: 'PolarGlow',
    docsUrl: 'https://reactbits.dev/backgrounds/aurora',
    tags: []
  },
  'Backgrounds/PaintVortex': {
    videoUrl: '/assets/video/balatro.webm',
    description: 'The balatro shader, fully customizalbe and interactive.',
    category: 'Backgrounds',
    name: 'PaintVortex',
    docsUrl: 'https://reactbits.dev/backgrounds/balatro',
    tags: []
  },
  'Backgrounds/SpherePool': {
    videoUrl: '/assets/video/ballpit.webm',
    description: 'Physics ball pit simulation with bouncing colorful spheres.',
    category: 'Backgrounds',
    name: 'SpherePool',
    docsUrl: 'https://reactbits.dev/backgrounds/ballpit',
    tags: []
  },
  'Backgrounds/CrossingBands': {
    videoUrl: '/assets/video/beams.webm',
    description: 'Crossing animated ribbons with customizable properties.',
    category: 'Backgrounds',
    name: 'CrossingBands',
    docsUrl: 'https://reactbits.dev/backgrounds/beams',
    tags: []
  },
  'Backgrounds/RainbowDrift': {
    videoUrl: '/assets/video/colorbends.webm',
    description: 'Vibrant color bends with smooth flowing animation.',
    category: 'Backgrounds',
    name: 'RainbowDrift',
    docsUrl: 'https://reactbits.dev/backgrounds/color-bends',
    tags: []
  },
  'Backgrounds/MidnightHaze': {
    videoUrl: '/assets/video/darkveil.webm',
    description: 'Subtle dark background with a smooth animation and postprocessing.',
    category: 'Backgrounds',
    name: 'MidnightHaze',
    docsUrl: 'https://reactbits.dev/backgrounds/dark-veil',
    tags: []
  },
  'Backgrounds/RetroStatic': {
    videoUrl: '/assets/video/dither.webm',
    description: 'Retro dithered noise shader background.',
    category: 'Backgrounds',
    name: 'RetroStatic',
    docsUrl: 'https://reactbits.dev/backgrounds/dither',
    tags: []
  },
  'Backgrounds/StippleSurface': {
    videoUrl: '/assets/video/dotfield.webm',
    description: 'Interactive dot grid with cursor bulge, glow, sparkle, and wave effects.',
    category: 'Backgrounds',
    name: 'StippleSurface',
    docsUrl: 'https://reactbits.dev/backgrounds/dot-field',
    tags: []
  },
  'Backgrounds/PointLattice': {
    videoUrl: '/assets/video/dotgrid.webm',
    description: 'Animated dot grid with cursor interactions.',
    category: 'Backgrounds',
    name: 'PointLattice',
    docsUrl: 'https://reactbits.dev/backgrounds/dot-grid',
    tags: []
  },
  'Backgrounds/CrtFlicker': {
    videoUrl: '/assets/video/faultyterminal.webm',
    description: 'Terminal CRT scanline squares effect with flicker + noise.',
    category: 'Backgrounds',
    name: 'CrtFlicker',
    docsUrl: 'https://reactbits.dev/backgrounds/faulty-terminal',
    tags: []
  },
  'Backgrounds/Cosmos': {
    videoUrl: '/assets/video/galaxy.webm',
    description: 'Parallax realistic starfield with pointer interactions.',
    category: 'Backgrounds',
    name: 'Cosmos',
    docsUrl: 'https://reactbits.dev/backgrounds/galaxy',
    tags: []
  },
  'Backgrounds/ShutterGlow': {
    videoUrl: '/assets/video/gradientblinds.webm',
    description: 'Layered gradient blinds with spotlight and noise distortion.',
    category: 'Backgrounds',
    name: 'ShutterGlow',
    docsUrl: 'https://reactbits.dev/backgrounds/gradient-blinds',
    tags: []
  },
  'Backgrounds/NeonDownpour': {
    videoUrl: '/assets/video/lightfall.webm',
    description: 'Colorful light streaks raining down a glowing tunnel with a cursor light.',
    category: 'Backgrounds',
    name: 'NeonDownpour',
    docsUrl: 'https://reactbits.dev/backgrounds/lightfall',
    tags: []
  },
  'Backgrounds/FluxPool': {
    videoUrl: '/assets/video/ferrofluid.webm',
    description: 'A churning magnetic fluid traced by glowing contour lines, with a cursor magnet.',
    category: 'Backgrounds',
    name: 'FluxPool',
    docsUrl: 'https://reactbits.dev/backgrounds/ferrofluid',
    tags: []
  },
  'Backgrounds/ForgeSwirl': {
    videoUrl: '/assets/video/moltenmetal.webm',
    description: 'Swirling caustic plasma filaments with molten, white-hot cores.',
    category: 'Backgrounds',
    name: 'ForgeSwirl',
    docsUrl: 'https://reactbits.dev/backgrounds/molten-metal',
    tags: []
  },
  'Backgrounds/HorizonSwells': {
    videoUrl: '/assets/video/gradientwaves.webm',
    description: 'Raymarched sine waves rolling toward a soft, hazy horizon.',
    category: 'Backgrounds',
    name: 'HorizonSwells',
    docsUrl: 'https://reactbits.dev/backgrounds/gradient-waves',
    tags: []
  },
  'Backgrounds/FocalFibers': {
    videoUrl: '/assets/video/webthreads.webm',
    description: 'Glowing sine threads woven through a luminous convergence point.',
    category: 'Backgrounds',
    name: 'FocalFibers',
    docsUrl: 'https://reactbits.dev/backgrounds/web-threads',
    tags: []
  },
  'Backgrounds/ContourField': {
    videoUrl: '/assets/video/topography.webm',
    description: 'A living contour map with glowing, elevation-tinted lines.',
    category: 'Backgrounds',
    name: 'ContourField',
    docsUrl: 'https://reactbits.dev/backgrounds/topography',
    tags: []
  },
  'Backgrounds/FiberRush': {
    videoUrl: '/assets/video/lighttunnel.webm',
    description: 'A radial fibre-optic tunnel with light pulses racing into depth.',
    category: 'Backgrounds',
    name: 'FiberRush',
    docsUrl: 'https://reactbits.dev/backgrounds/light-tunnel',
    tags: []
  },
  'Backgrounds/SlatRipple': {
    videoUrl: '/assets/video/slicedwaves.webm',
    description: 'A grid of soft glowing bars rippling like a slatted equalizer.',
    category: 'Backgrounds',
    name: 'SlatRipple',
    docsUrl: 'https://reactbits.dev/backgrounds/sliced-waves',
    tags: []
  },
  'Backgrounds/CrystalCorridor': {
    videoUrl: '/assets/video/acidsquares.webm',
    description: 'A crystalline corridor of stacked squares receding into depth.',
    category: 'Backgrounds',
    name: 'CrystalCorridor',
    docsUrl: 'https://reactbits.dev/backgrounds/acid-squares',
    tags: []
  },
  'Backgrounds/SignalBands': {
    videoUrl: '/assets/video/scanner.webm',
    description: 'Calm interference bands sweeping across the screen like an oscilloscope.',
    category: 'Backgrounds',
    name: 'SignalBands',
    docsUrl: 'https://reactbits.dev/backgrounds/scanner',
    tags: []
  },
  'Backgrounds/SpeckleWash': {
    videoUrl: '/assets/video/grainient.webm',
    description: 'Grainy gradient swirls with soft wave distortion.',
    category: 'Backgrounds',
    name: 'SpeckleWash',
    docsUrl: 'https://reactbits.dev/backgrounds/grainient',
    tags: []
  },
  'Backgrounds/WireframeSweep': {
    videoUrl: '/assets/video/gridscan.webm',
    description: 'Animated grid room 3D scan effect and cool interactions.',
    category: 'Backgrounds',
    name: 'WireframeSweep',
    docsUrl: 'https://reactbits.dev/backgrounds/grid-scan',
    tags: []
  },
  'Backgrounds/LatticeBend': {
    videoUrl: '/assets/video/griddistortion.webm',
    description: 'Warped grid mesh distorts smoothly reacting to cursor.',
    category: 'Backgrounds',
    name: 'LatticeBend',
    docsUrl: 'https://reactbits.dev/backgrounds/grid-distortion',
    tags: []
  },
  'Backgrounds/MeshDrift': {
    videoUrl: '/assets/video/gridmotion.webm',
    description: 'Perspective moving grid lines based on cusror position.',
    category: 'Backgrounds',
    name: 'MeshDrift',
    docsUrl: 'https://reactbits.dev/backgrounds/grid-motion',
    tags: []
  },
  'Backgrounds/WarpDrive': {
    videoUrl: '/assets/video/hyperspeed.webm',
    description: 'Animated lines continuously moving to simulate hyperspace travel on click hold.',
    category: 'Backgrounds',
    name: 'WarpDrive',
    docsUrl: 'https://reactbits.dev/backgrounds/hyperspeed',
    tags: []
  },
  'Backgrounds/OilSlick': {
    videoUrl: '/assets/video/iridescence.webm',
    description: 'Slick iridescent shader with shifting waves.',
    category: 'Backgrounds',
    name: 'OilSlick',
    docsUrl: 'https://reactbits.dev/backgrounds/iridescence',
    tags: []
  },
  'Backgrounds/CipherRain': {
    videoUrl: '/assets/video/letterglitch.webm',
    description: 'Matrix style letter animation.',
    category: 'Backgrounds',
    name: 'CipherRain',
    docsUrl: 'https://reactbits.dev/backgrounds/letter-glitch',
    tags: []
  },
  'Backgrounds/SunShafts': {
    videoUrl: '/assets/video/lightrays.webm',
    description: 'Volumetric light rays/beams with customizable direction.',
    category: 'Backgrounds',
    name: 'SunShafts',
    docsUrl: 'https://reactbits.dev/backgrounds/light-rays',
    tags: []
  },
  'Backgrounds/StormBolts': {
    videoUrl: '/assets/video/lightning.webm',
    description: 'Procedural lightning bolts with branching and glow flicker.',
    category: 'Backgrounds',
    name: 'StormBolts',
    docsUrl: 'https://reactbits.dev/backgrounds/lightning',
    tags: []
  },
  'Backgrounds/WarpStrings': {
    videoUrl: '/assets/video/linewaves.webm',
    description: 'Animated line wave pattern with colorful warped distortion.',
    category: 'Backgrounds',
    name: 'WarpStrings',
    docsUrl: 'https://reactbits.dev/backgrounds/line-waves',
    tags: []
  },
  'Backgrounds/EmberGaze': {
    videoUrl: '/assets/video/evileye.webm',
    description: 'Procedural evil eye shader with animated iris, slit pupil, and fiery outer glow.',
    category: 'Backgrounds',
    name: 'EmberGaze',
    docsUrl: 'https://reactbits.dev/backgrounds/evil-eye',
    tags: []
  },
  'Backgrounds/SonarSweep': {
    videoUrl: '/assets/video/radar.webm',
    description: 'Radar sweep effect with concentric rings, radial spokes, and a rotating beam.',
    category: 'Backgrounds',
    name: 'SonarSweep',
    docsUrl: 'https://reactbits.dev/backgrounds/radar',
    tags: []
  },
  'Backgrounds/BorealisGlow': {
    videoUrl: '/assets/video/softaurora.webm',
    description: 'Soft aurora borealis shader with 3D Perlin noise and cosine gradient palettes.',
    category: 'Backgrounds',
    name: 'BorealisGlow',
    docsUrl: 'https://reactbits.dev/backgrounds/soft-aurora',
    tags: []
  },
  'Backgrounds/MercuryFlow': {
    videoUrl: '/assets/video/liquidchrome.webm',
    description: 'Liquid metallic chrome shader with flowing reflective surface.',
    category: 'Backgrounds',
    name: 'MercuryFlow',
    docsUrl: 'https://reactbits.dev/backgrounds/liquid-chrome',
    tags: []
  },
  'Backgrounds/AuraSphere': {
    videoUrl: '/assets/video/orb.webm',
    description: 'Floating energy orb with customizable hover effect.',
    category: 'Backgrounds',
    name: 'AuraSphere',
    docsUrl: 'https://reactbits.dev/backgrounds/orb',
    tags: []
  },
  'Backgrounds/MoteField': {
    videoUrl: '/assets/video/particles.webm',
    description: 'Configurable particle system.',
    category: 'Backgrounds',
    name: 'MoteField',
    docsUrl: 'https://reactbits.dev/backgrounds/particles',
    tags: []
  },
  'Backgrounds/SquareBurst': {
    videoUrl: '/assets/video/pixelblast.webm',
    description: 'Exploding pixel particle bursts with optional liquid postprocessing.',
    category: 'Backgrounds',
    name: 'SquareBurst',
    docsUrl: 'https://reactbits.dev/backgrounds/pixel-blast',
    tags: []
  },
  'Backgrounds/NebulaDrift': {
    videoUrl: '/assets/video/plasma.webm',
    description: 'Organic plasma gradients swirl + morph with smooth turbulence.',
    category: 'Backgrounds',
    name: 'NebulaDrift',
    docsUrl: 'https://reactbits.dev/backgrounds/plasma',
    tags: []
  },
  'Backgrounds/IonSwell': {
    videoUrl: '/assets/video/plasmawave.webm',
    description: 'Raymarched plasma waves with dual-wave interference and OGL.',
    category: 'Backgrounds',
    name: 'IonSwell',
    docsUrl: 'https://reactbits.dev/backgrounds/plasma-wave',
    tags: []
  },
  'Backgrounds/CrystalSpin': {
    videoUrl: '/assets/video/prism.webm',
    description: 'Rotating prism with configurable intensity, size, and colors.',
    category: 'Backgrounds',
    name: 'CrystalSpin',
    docsUrl: 'https://reactbits.dev/backgrounds/prism',
    tags: []
  },
  'Backgrounds/SpectrumFlare': {
    videoUrl: '/assets/video/prismaticburst.webm',
    description: 'Burst of light rays with controllable color, distortion, amount.',
    category: 'Backgrounds',
    name: 'SpectrumFlare',
    docsUrl: 'https://reactbits.dev/backgrounds/prismatic-burst',
    tags: []
  },
  'Backgrounds/WaveLattice': {
    videoUrl: '/assets/video/ripplegrid.webm',
    description: 'A grid that continuously animates with a ripple effect.',
    category: 'Backgrounds',
    name: 'WaveLattice',
    docsUrl: 'https://reactbits.dev/backgrounds/ripple-grid',
    tags: []
  },
  'Backgrounds/SatinFlow': {
    videoUrl: '/assets/video/silk.webm',
    description: 'Smooth waves background with soft lighting.',
    category: 'Backgrounds',
    name: 'SatinFlow',
    docsUrl: 'https://reactbits.dev/backgrounds/silk',
    tags: []
  },
  'Backgrounds/EdgeBeams': {
    videoUrl: '/assets/video/siderays.webm',
    description: 'Animated light rays emanating from the side with customizable colors and speed.',
    category: 'Backgrounds',
    name: 'EdgeBeams',
    docsUrl: 'https://reactbits.dev/backgrounds/side-rays',
    tags: []
  },
  'Backgrounds/GeoLattice': {
    videoUrl: '/assets/video/squares.webm',
    description: 'Animated grid with shape variants (square, hexagon, circle, triangle) + direction customization.',
    category: 'Backgrounds',
    name: 'GeoLattice',
    docsUrl: 'https://reactbits.dev/backgrounds/shape-grid',
    tags: []
  },
  'Backgrounds/Loom': {
    videoUrl: '/assets/video/threads.webm',
    description: 'Animated pattern of lines forming a fabric-like motion.',
    category: 'Backgrounds',
    name: 'Loom',
    docsUrl: 'https://reactbits.dev/backgrounds/threads',
    tags: []
  },
  'Backgrounds/RippleLines': {
    videoUrl: '/assets/video/waves.webm',
    description: 'Layered lines that form smooth wave patterns with animation.',
    category: 'Backgrounds',
    name: 'RippleLines',
    docsUrl: 'https://reactbits.dev/backgrounds/waves',
    tags: []
  },
  'Backgrounds/InkCurrents': {
    videoUrl: '/assets/video/liquidether.webm',
    description:
      'Interactive liquid shader with flowing distortion and customizable colors.',
    category: 'Backgrounds',
    name: 'InkCurrents',
    docsUrl: 'https://reactbits.dev/backgrounds/liquid-ether',
    tags: []
  },
  'Backgrounds/DriftingWires': {
    videoUrl: '/assets/video/floatinglines.webm',
    description: '3D floating lines that react to cursor movement.',
    category: 'Backgrounds',
    name: 'DriftingWires',
    docsUrl: 'https://reactbits.dev/backgrounds/floating-lines',
    tags: []
  },
  'Backgrounds/GlowColumn': {
    videoUrl: '/assets/video/lightpillar.webm',
    description: 'Vertical pillar of light with glow effects.',
    category: 'Backgrounds',
    name: 'GlowColumn',
    docsUrl: 'https://reactbits.dev/backgrounds/light-pillar',
    tags: []
  },
  'Backgrounds/RetroFlurry': {
    videoUrl: '/assets/video/pixelsnow.webm',
    description: 'Falling pixelated snow effect with customizable density and speed.',
    category: 'Backgrounds',
    name: 'RetroFlurry',
    docsUrl: 'https://reactbits.dev/backgrounds/pixel-snow',
    tags: []
  }
};

export default componentMetadata;



// >>> foxbits:renames (generated by scripts/apply-renames.ts — do not edit)
Object.defineProperty(componentMetadata, 'Animations/AnimatedContent', { value: componentMetadata['Animations/MotionWrap'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/BlobCursor', { value: componentMetadata['Animations/GooPointer'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/ClickSpark', { value: componentMetadata['Animations/TapBurst'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/Crosshair', { value: componentMetadata['Animations/Reticle'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/Cubes', { value: componentMetadata['Animations/VoxelCluster'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/ElectricBorder', { value: componentMetadata['Animations/VoltageFrame'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/FadeContent', { value: componentMetadata['Animations/SoftEntrance'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/GlareHover', { value: componentMetadata['Animations/GlossGlide'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/GradualBlur', { value: componentMetadata['Animations/FocusPull'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/GhostCursor', { value: componentMetadata['Animations/PhantomPointer'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/ImageTrail', { value: componentMetadata['Animations/PhotoWake'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/LogoLoop', { value: componentMetadata['Animations/BrandMarquee'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/Magnet', { value: componentMetadata['Animations/PointerPull'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/MagnetLines', { value: componentMetadata['Animations/CompassField'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/MetaBalls', { value: componentMetadata['Animations/BlobFusion'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/Strands', { value: componentMetadata['Animations/FilamentWeave'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/MetallicPaint', { value: componentMetadata['Animations/ChromeInk'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/Noise', { value: componentMetadata['Animations/FilmGrain'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/PixelTrail', { value: componentMetadata['Animations/SquareWake'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/PixelTransition', { value: componentMetadata['Animations/CheckerDissolve'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/PixelSwap', { value: componentMetadata['Animations/ShardSwitch'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/Ribbons', { value: componentMetadata['Animations/Streamers'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/ShapeBlur', { value: componentMetadata['Animations/HazyMorph'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/SplashCursor', { value: componentMetadata['Animations/RipplePointer'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/StarBorder', { value: componentMetadata['Animations/TwinkleFrame'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/StickerPeel', { value: componentMetadata['Animations/DecalLift'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/TargetCursor', { value: componentMetadata['Animations/LockOnPointer'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/LaserFlow', { value: componentMetadata['Animations/BeamCascade'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/Antigravity', { value: componentMetadata['Animations/RepelField'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/OrbitImages', { value: componentMetadata['Animations/PhotoSatellites'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/MagicRings', { value: componentMetadata['Animations/ArcaneHalos'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/AsciiText', { value: componentMetadata['TextAnimations/TerminalType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/BlurText', { value: componentMetadata['TextAnimations/SharpenType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/CircularText', { value: componentMetadata['TextAnimations/ArcType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/CountUp', { value: componentMetadata['TextAnimations/TallyClimb'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/CurvedLoop', { value: componentMetadata['TextAnimations/RibbonMarquee'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/DecryptedText', { value: componentMetadata['TextAnimations/CipherReveal'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/FallingText', { value: componentMetadata['TextAnimations/GravityLetters'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/FuzzyText', { value: componentMetadata['TextAnimations/TremorType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/GlitchText', { value: componentMetadata['TextAnimations/StaticType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/GradientText', { value: componentMetadata['TextAnimations/RainbowType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/RotatingText', { value: componentMetadata['TextAnimations/PhraseFlip'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/ScrambledText', { value: componentMetadata['TextAnimations/SmudgeType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/ScrollFloat', { value: componentMetadata['TextAnimations/ParallaxLift'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/ScrollReveal', { value: componentMetadata['TextAnimations/IntoFocus'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/ScrollVelocity', { value: componentMetadata['TextAnimations/MomentumMarquee'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/ShinyText', { value: componentMetadata['TextAnimations/SheenSweep'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/SplitText', { value: componentMetadata['TextAnimations/LetterBreak'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/TextCursor', { value: componentMetadata['TextAnimations/WordTrail'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/TextPressure', { value: componentMetadata['TextAnimations/SquishType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/TextType', { value: componentMetadata['TextAnimations/KeystrokeReveal'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/TrueFocus', { value: componentMetadata['TextAnimations/BlurRelay'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/VariableProximity', { value: componentMetadata['TextAnimations/MagneticInk'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/Shuffle', { value: componentMetadata['TextAnimations/RiffleType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/ParticleText', { value: componentMetadata['TextAnimations/DustType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/SplitFlapText', { value: componentMetadata['TextAnimations/DepartureBoard'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/WarpText', { value: componentMetadata['TextAnimations/LiquidLetters'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/StrokeText', { value: componentMetadata['TextAnimations/OutlineInk'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/DepthText', { value: componentMetadata['TextAnimations/ExtrudedType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/FoldText', { value: componentMetadata['TextAnimations/OrigamiType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/EchoText', { value: componentMetadata['TextAnimations/AfterimageType'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/MaskedHeading', { value: componentMetadata['TextAnimations/StencilTitle'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'TextAnimations/TextLoop', { value: componentMetadata['TextAnimations/PathMarquee'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/AnimatedList', { value: componentMetadata['Components/RevealList'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/BounceCards', { value: componentMetadata['Components/SpringDeck'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/BubbleMenu', { value: componentMetadata['Components/BloomNav'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/CardNav', { value: componentMetadata['Components/PanelNav'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/CardSwap', { value: componentMetadata['Components/DeckCycle'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/Carousel', { value: componentMetadata['Components/SwipeReel'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/ChromaGrid', { value: componentMetadata['Components/HueTiles'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/DepthCarousel', { value: componentMetadata['Components/PerspectiveRail'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/AccordionGallery', { value: componentMetadata['Components/ConcertinaPanels'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/MorphSlider', { value: componentMetadata['Components/MeltReel'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/DriftWall', { value: componentMetadata['Components/TileStream'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/CircularGallery', { value: componentMetadata['Components/RingReel'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/Counter', { value: componentMetadata['Components/DigitRoll'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/DecayCard', { value: componentMetadata['Components/DissolvePanel'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/Dock', { value: componentMetadata['Components/ZoomShelf'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/DomeGallery', { value: componentMetadata['Components/HemisphereGallery'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/ElasticSlider', { value: componentMetadata['Components/RubberRange'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/FlowingMenu', { value: componentMetadata['Components/LiquidNav'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/FluidGlass', { value: componentMetadata['Components/LiquidPane'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/FlyingPosters', { value: componentMetadata['Components/BillboardStream'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/Folder', { value: componentMetadata['Components/Dossier'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/GlassIcons', { value: componentMetadata['Components/FrostedGlyphs'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/GlassSurface', { value: componentMetadata['Components/CrystalPanel'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/GooeyNav', { value: componentMetadata['Components/TaffyTabs'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/InfiniteMenu', { value: componentMetadata['Components/EndlessRail'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/Lanyard', { value: componentMetadata['Components/BadgeSwing'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/MagicBento', { value: componentMetadata['Components/SparkTiles'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/Masonry', { value: componentMetadata['Components/PatchworkGrid'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/ModelViewer', { value: componentMetadata['Components/OrbitStage'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/PillNav', { value: componentMetadata['Components/CapsuleTabs'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/PixelCard', { value: componentMetadata['Components/BitmapPanel'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/ProfileCard', { value: componentMetadata['Components/HoloBadge'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/ScrollStack', { value: componentMetadata['Components/PinDeck'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/SpotlightCard', { value: componentMetadata['Components/BeaconTile'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/BorderGlow', { value: componentMetadata['Components/HaloEdge'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/LineSidebar', { value: componentMetadata['Components/ProximityNav'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/OptionWheel', { value: componentMetadata['Components/ChoiceDial'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/SpecularButton', { value: componentMetadata['Components/RimlightButton'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/ElasticMesh', { value: componentMetadata['Animations/SpringFabric'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/RippleDistortion', { value: componentMetadata['Animations/WaterWarp'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/SwarmCursor', { value: componentMetadata['Animations/FlockPointer'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/HalftoneReveal', { value: componentMetadata['Animations/NewsprintLens'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/ScrollExpand', { value: componentMetadata['Animations/FrameBloom'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Animations/CursorGrid', { value: componentMetadata['Animations/PointerCells'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/CurvedInput', { value: componentMetadata['Components/ArcField'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/Stack', { value: componentMetadata['Components/SwipeDeck'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/Stepper', { value: componentMetadata['Components/StageTracker'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/TiltedCard', { value: componentMetadata['Components/PivotPanel'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/StaggeredMenu', { value: componentMetadata['Components/WaterfallNav'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Components/ReflectiveCard', { value: componentMetadata['Components/MirrorPane'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Aurora', { value: componentMetadata['Backgrounds/PolarGlow'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Balatro', { value: componentMetadata['Backgrounds/PaintVortex'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Ballpit', { value: componentMetadata['Backgrounds/SpherePool'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Beams', { value: componentMetadata['Backgrounds/CrossingBands'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/ColorBends', { value: componentMetadata['Backgrounds/RainbowDrift'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/DarkVeil', { value: componentMetadata['Backgrounds/MidnightHaze'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Dither', { value: componentMetadata['Backgrounds/RetroStatic'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/DotField', { value: componentMetadata['Backgrounds/StippleSurface'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/DotGrid', { value: componentMetadata['Backgrounds/PointLattice'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/FaultyTerminal', { value: componentMetadata['Backgrounds/CrtFlicker'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Galaxy', { value: componentMetadata['Backgrounds/Cosmos'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/GradientBlinds', { value: componentMetadata['Backgrounds/ShutterGlow'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Lightfall', { value: componentMetadata['Backgrounds/NeonDownpour'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Ferrofluid', { value: componentMetadata['Backgrounds/FluxPool'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/MoltenMetal', { value: componentMetadata['Backgrounds/ForgeSwirl'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/GradientWaves', { value: componentMetadata['Backgrounds/HorizonSwells'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/WebThreads', { value: componentMetadata['Backgrounds/FocalFibers'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Topography', { value: componentMetadata['Backgrounds/ContourField'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/LightTunnel', { value: componentMetadata['Backgrounds/FiberRush'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/SlicedWaves', { value: componentMetadata['Backgrounds/SlatRipple'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/AcidSquares', { value: componentMetadata['Backgrounds/CrystalCorridor'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Scanner', { value: componentMetadata['Backgrounds/SignalBands'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Grainient', { value: componentMetadata['Backgrounds/SpeckleWash'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/GridScan', { value: componentMetadata['Backgrounds/WireframeSweep'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/GridDistortion', { value: componentMetadata['Backgrounds/LatticeBend'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/GridMotion', { value: componentMetadata['Backgrounds/MeshDrift'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Hyperspeed', { value: componentMetadata['Backgrounds/WarpDrive'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Iridescence', { value: componentMetadata['Backgrounds/OilSlick'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/LetterGlitch', { value: componentMetadata['Backgrounds/CipherRain'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/LightRays', { value: componentMetadata['Backgrounds/SunShafts'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Lightning', { value: componentMetadata['Backgrounds/StormBolts'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/LineWaves', { value: componentMetadata['Backgrounds/WarpStrings'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/EvilEye', { value: componentMetadata['Backgrounds/EmberGaze'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Radar', { value: componentMetadata['Backgrounds/SonarSweep'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/SoftAurora', { value: componentMetadata['Backgrounds/BorealisGlow'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/LiquidChrome', { value: componentMetadata['Backgrounds/MercuryFlow'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Orb', { value: componentMetadata['Backgrounds/AuraSphere'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Particles', { value: componentMetadata['Backgrounds/MoteField'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/PixelBlast', { value: componentMetadata['Backgrounds/SquareBurst'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Plasma', { value: componentMetadata['Backgrounds/NebulaDrift'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/PlasmaWave', { value: componentMetadata['Backgrounds/IonSwell'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Prism', { value: componentMetadata['Backgrounds/CrystalSpin'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/PrismaticBurst', { value: componentMetadata['Backgrounds/SpectrumFlare'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/RippleGrid', { value: componentMetadata['Backgrounds/WaveLattice'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Silk', { value: componentMetadata['Backgrounds/SatinFlow'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/SideRays', { value: componentMetadata['Backgrounds/EdgeBeams'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/ShapeGrid', { value: componentMetadata['Backgrounds/GeoLattice'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Threads', { value: componentMetadata['Backgrounds/Loom'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/Waves', { value: componentMetadata['Backgrounds/RippleLines'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/LiquidEther', { value: componentMetadata['Backgrounds/InkCurrents'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/FloatingLines', { value: componentMetadata['Backgrounds/DriftingWires'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/LightPillar', { value: componentMetadata['Backgrounds/GlowColumn'], enumerable: false, configurable: true });
Object.defineProperty(componentMetadata, 'Backgrounds/PixelSnow', { value: componentMetadata['Backgrounds/RetroFlurry'], enumerable: false, configurable: true });
// <<< foxbits:renames
