import { PRO_MAP } from './ProCatalog';
const getStarted = {
  introduction: () => import('../docs/Introduction.jsx'),
  installation: () => import('../docs/Installation.jsx'),
  mcp: () => import('../docs/McpServer.jsx')
};

const animations = {
  'focus-pull': () => import('../demo/Animations/FocusPullDemo'),
  'goo-pointer': () => import('../demo/Animations/GooPointerDemo'),
  'motion-wrap': () => import('../demo/Animations/MotionWrapDemo'),
  'pointer-pull': () => import('../demo/Animations/PointerPullDemo'),
  'soft-entrance': () => import('../demo/Animations/SoftEntranceDemo'),
  'reticle': () => import('../demo/Animations/ReticleDemo'),
  'hazy-morph': () => import('../demo/Animations/HazyMorphDemo'),
  'twinkle-frame': () => import('../demo/Animations/TwinkleFrameDemo'),
  'film-grain': () => import('../demo/Animations/FilmGrainDemo'),
  'compass-field': () => import('../demo/Animations/CompassFieldDemo'),
  'ripple-pointer': () => import('../demo/Animations/RipplePointerDemo'),
  'tap-burst': () => import('../demo/Animations/TapBurstDemo'),
  'checker-dissolve': () => import('../demo/Animations/CheckerDissolveDemo'),
  'shard-switch': () => import('../demo/Animations/ShardSwitchDemo'),
  'photo-wake': () => import('../demo/Animations/PhotoWakeDemo'),
  'square-wake': () => import('../demo/Animations/SquareWakeDemo'),
  'streamers': () => import('../demo/Animations/StreamersDemo'),
  'blob-fusion': () => import('../demo/Animations/BlobFusionDemo'),
  'chrome-ink': () => import('../demo/Animations/ChromeInkDemo'),
  'gloss-glide': () => import('../demo/Animations/GlossGlideDemo'),
  'voxel-cluster': () => import('../demo/Animations/VoxelClusterDemo'),
  'lock-on-pointer': () => import('../demo/Animations/LockOnPointerDemo'),
  'decal-lift': () => import('../demo/Animations/DecalLiftDemo'),
  'frame-bloom': () => import('../demo/Animations/FrameBloomDemo'),
  'stencil-title': () => import('../demo/TextAnimations/StencilTitleDemo'),
  'spring-fabric': () => import('../demo/Animations/SpringFabricDemo'),
  'water-warp': () => import('../demo/Animations/WaterWarpDemo'),
  'flock-pointer': () => import('../demo/Animations/FlockPointerDemo'),
  'newsprint-lens': () => import('../demo/Animations/NewsprintLensDemo'),
  'voltage-frame': () => import('../demo/Animations/VoltageFrameDemo'),
  'beam-cascade': () => import('../demo/Animations/BeamCascadeDemo'),
  'phantom-pointer': () => import('../demo/Animations/PhantomPointerDemo'),
  'repel-field': () => import('../demo/Animations/RepelFieldDemo'),
  'photo-satellites': () => import('../demo/Animations/PhotoSatellitesDemo'),
  'arcane-halos': () => import('../demo/Animations/ArcaneHalosDemo'),
  'filament-weave': () => import('../demo/Animations/FilamentWeaveDemo'),
  'pointer-cells': () => import('../demo/Animations/PointerCellsDemo'),
};

const textAnimations = {
  'letter-break': () => import('../demo/TextAnimations/LetterBreakDemo'),
  'sharpen-type': () => import('../demo/TextAnimations/SharpenTypeDemo'),
  'sheen-sweep': () => import('../demo/TextAnimations/SheenSweepDemo'),
  'rainbow-type': () => import('../demo/TextAnimations/RainbowTypeDemo'),
  'tally-climb': () => import('../demo/TextAnimations/TallyClimbDemo'),
  'cipher-reveal': () => import('../demo/TextAnimations/CipherRevealDemo'),
  'blur-relay': () => import('../demo/TextAnimations/BlurRelayDemo'),
  'magnetic-ink': () => import('../demo/TextAnimations/MagneticInkDemo'),
  'squish-type': () => import('../demo/TextAnimations/SquishTypeDemo'),
  'terminal-type': () => import('../demo/TextAnimations/TerminalTypeDemo.jsx'),
  'gravity-letters': () => import('../demo/TextAnimations/GravityLettersDemo'),
  'phrase-flip': () => import('../demo/TextAnimations/PhraseFlipDemo'),
  'arc-type': () => import('../demo/TextAnimations/ArcTypeDemo'),
  'momentum-marquee': () => import('../demo/TextAnimations/MomentumMarqueeDemo'),
  'into-focus': () => import('../demo/TextAnimations/IntoFocusDemo'),
  'parallax-lift': () => import('../demo/TextAnimations/ParallaxLiftDemo'),
  'static-type': () => import('../demo/TextAnimations/StaticTypeDemo'),
  'tremor-type': () => import('../demo/TextAnimations/TremorTypeDemo'),
  'word-trail': () => import('../demo/TextAnimations/WordTrailDemo'),
  'smudge-type': () => import('../demo/TextAnimations/SmudgeTypeDemo'),
  'ribbon-marquee': () => import('../demo/TextAnimations/RibbonMarqueeDemo'),
  'keystroke-reveal': () => import('../demo/TextAnimations/KeystrokeRevealDemo'),
  'brand-marquee': () => import('../demo/Animations/BrandMarqueeDemo'),
  'riffle-type': () => import('../demo/TextAnimations/RiffleTypeDemo'),
  'dust-type': () => import('../demo/TextAnimations/DustTypeDemo'),
  'departure-board': () => import('../demo/TextAnimations/DepartureBoardDemo'),
  'liquid-letters': () => import('../demo/TextAnimations/LiquidLettersDemo'),
  'outline-ink': () => import('../demo/TextAnimations/OutlineInkDemo'),
  'extruded-type': () => import('../demo/TextAnimations/ExtrudedTypeDemo'),
  'origami-type': () => import('../demo/TextAnimations/OrigamiTypeDemo'),
  'afterimage-type': () => import('../demo/TextAnimations/AfterimageTypeDemo'),
  'path-marquee': () => import('../demo/TextAnimations/PathMarqueeDemo')
};

const components = {
  'swipe-deck': () => import('../demo/Components/SwipeDeckDemo'),
  'zoom-shelf': () => import('../demo/Components/ZoomShelfDemo'),
  'beacon-tile': () => import('../demo/Components/BeaconTileDemo'),
  'halo-edge': () => import('../demo/Components/HaloEdgeDemo'),
  'rubber-range': () => import('../demo/Components/RubberRangeDemo'),
  'dissolve-panel': () => import('../demo/Components/DissolvePanelDemo'),
  'spring-deck': () => import('../demo/Components/SpringDeckDemo'),
  'bitmap-panel': () => import('../demo/Components/BitmapPanelDemo'),
  'pivot-panel': () => import('../demo/Components/PivotPanelDemo'),
  'endless-rail': () => import('../demo/Components/EndlessRailDemo'),
  'billboard-stream': () => import('../demo/Components/BillboardStreamDemo'),
  'liquid-nav': () => import('../demo/Components/LiquidNavDemo'),
  'perspective-rail': () => import('../demo/Components/PerspectiveRailDemo'),
  'concertina-panels': () => import('../demo/Components/ConcertinaPanelsDemo'),
  'melt-reel': () => import('../demo/Components/MeltReelDemo'),
  'tile-stream': () => import('../demo/Components/TileStreamDemo'),
  'ring-reel': () => import('../demo/Components/RingReelDemo'),
  'stage-tracker': () => import('../demo/Components/StageTrackerDemo'),
  'swipe-reel': () => import('../demo/Components/SwipeReelDemo'),
  'digit-roll': () => import('../demo/Components/DigitRollDemo'),
  'badge-swing': () => import('../demo/Components/BadgeSwingDemo'),
  'frosted-glyphs': () => import('../demo/Components/FrostedGlyphsDemo'),
  'reveal-list': () => import('../demo/Components/RevealListDemo'),
  'dossier': () => import('../demo/Components/DossierDemo'),
  'taffy-tabs': () => import('../demo/Components/TaffyTabsDemo'),
  'hue-tiles': () => import('../demo/Components/HueTilesDemo'),
  'holo-badge': () => import('../demo/Components/HoloBadgeDemo'),
  'deck-cycle': () => import('../demo/Components/DeckCycleDemo'),
  'orbit-stage': () => import('../demo/Components/OrbitStageDemo'),
  'liquid-pane': () => import('../demo/Components/LiquidPaneDemo'),
  'patchwork-grid': () => import('../demo/Components/PatchworkGridDemo'),
  'spark-tiles': () => import('../demo/Components/SparkTilesDemo'),
  'pin-deck': () => import('../demo/Components/PinDeckDemo'),
  'crystal-panel': () => import('../demo/Components/CrystalPanelDemo'),
  'capsule-tabs': () => import('../demo/Components/CapsuleTabsDemo.jsx'),
  'panel-nav': () => import('../demo/Components/PanelNavDemo'),
  'bloom-nav': () => import('../demo/Components/BloomNavDemo'),
  'hemisphere-gallery': () => import('../demo/Components/HemisphereGalleryDemo'),
  'waterfall-nav': () => import('../demo/Components/WaterfallNavDemo'),
  'mirror-pane': () => import('../demo/Components/MirrorPaneDemo'),
  'proximity-nav': () => import('../demo/Components/ProximityNavDemo'),
  'arc-field': () => import('../demo/Components/ArcFieldDemo'),
  'choice-dial': () => import('../demo/Components/ChoiceDialDemo'),
  'rimlight-button': () => import('../demo/Components/RimlightButtonDemo')
};

const backgrounds = {
  'satin-flow': () => import('../demo/Backgrounds/SatinFlowDemo'),
  'polar-glow': () => import('../demo/Backgrounds/PolarGlowDemo'),
  'geo-lattice': () => import('../demo/Backgrounds/GeoLatticeDemo'),
  'warp-drive': () => import('../demo/Backgrounds/WarpDriveDemo'),
  'oil-slick': () => import('../demo/Backgrounds/OilSlickDemo'),
  'mesh-drift': () => import('../demo/Backgrounds/MeshDriftDemo'),
  'ripple-lines': () => import('../demo/Backgrounds/RippleLinesDemo'),
  'sphere-pool': () => import('../demo/Backgrounds/SpherePoolDemo'),
  'cipher-rain': () => import('../demo/Backgrounds/CipherRainDemo'),
  'lattice-bend': () => import('../demo/Backgrounds/LatticeBendDemo'),
  'aura-sphere': () => import('../demo/Backgrounds/AuraSphereDemo'),
  'mote-field': () => import('../demo/Backgrounds/MoteFieldDemo'),
  'mercury-flow': () => import('../demo/Backgrounds/MercuryFlowDemo'),
  'paint-vortex': () => import('../demo/Backgrounds/PaintVortexDemo'),
  'loom': () => import('../demo/Backgrounds/LoomDemo'),
  'retro-static': () => import('../demo/Backgrounds/RetroStaticDemo'),
  'storm-bolts': () => import('../demo/Backgrounds/StormBoltsDemo'),
  'point-lattice': () => import('../demo/Backgrounds/PointLatticeDemo'),
  'crossing-bands': () => import('../demo/Backgrounds/CrossingBandsDemo'),
  'wave-lattice': () => import('../demo/Backgrounds/WaveLatticeDemo'),
  'midnight-haze': () => import('../demo/Backgrounds/MidnightHazeDemo'),
  'cosmos': () => import('../demo/Backgrounds/CosmosDemo'),
  'sun-shafts': () => import('../demo/Backgrounds/SunShaftsDemo'),
  'crt-flicker': () => import('../demo/Backgrounds/CRTFlickerDemo'),
  'nebula-drift': () => import('../demo/Backgrounds/NebulaDriftDemo'),
  'ion-swell': () => import('../demo/Backgrounds/IonSwellDemo'),
  'crystal-spin': () => import('../demo/Backgrounds/CrystalSpinDemo'),
  'shutter-glow': () => import('../demo/Backgrounds/ShutterGlowDemo'),
  'speckle-wash': () => import('../demo/Backgrounds/SpeckleWashDemo.jsx'),
  'spectrum-flare': () => import('../demo/Backgrounds/SpectrumFlareDemo.jsx'),
  'square-burst': () => import('../demo/Backgrounds/SquareBurstDemo.jsx'),
  'ink-currents': () => import('../demo/Backgrounds/InkCurrentsDemo.jsx'),
  'rainbow-drift': () => import('../demo/Backgrounds/RainbowDriftDemo.jsx'),
  'warp-strings': () => import('../demo/Backgrounds/WarpStringsDemo.jsx'),
  'wireframe-sweep': () => import('../demo/Backgrounds/WireframeSweepDemo.jsx'),
  'drifting-wires': () => import('../demo/Backgrounds/DriftingWiresDemo.jsx'),
  'glow-column': () => import('../demo/Backgrounds/GlowColumnDemo.jsx'),
  'retro-flurry': () => import('../demo/Backgrounds/RetroFlurryDemo.jsx'),
  'sonar-sweep': () => import('../demo/Backgrounds/SonarSweepDemo.jsx'),
  'borealis-glow': () => import('../demo/Backgrounds/BorealisGlowDemo.jsx'),
  'ember-gaze': () => import('../demo/Backgrounds/EmberGazeDemo.jsx'),
  'stipple-surface': () => import('../demo/Backgrounds/StippleSurfaceDemo'),
  'edge-beams': () => import('../demo/Backgrounds/EdgeBeamsDemo'),
  'neon-downpour': () => import('../demo/Backgrounds/NeonDownpourDemo.jsx'),
  'flux-pool': () => import('../demo/Backgrounds/FluxPoolDemo.jsx'),
  'forge-swirl': () => import('../demo/Backgrounds/ForgeSwirlDemo.jsx'),
  'horizon-swells': () => import('../demo/Backgrounds/HorizonSwellsDemo.jsx'),
  'focal-fibers': () => import('../demo/Backgrounds/FocalFibersDemo.jsx'),
  'contour-field': () => import('../demo/Backgrounds/ContourFieldDemo.jsx'),
  'fiber-rush': () => import('../demo/Backgrounds/FiberRushDemo.jsx'),
  'slat-ripple': () => import('../demo/Backgrounds/SlatRippleDemo.jsx'),
  'crystal-corridor': () => import('../demo/Backgrounds/CrystalCorridorDemo.jsx'),
  'signal-bands': () => import('../demo/Backgrounds/SignalBandsDemo.jsx')
};

export const componentMap = {
  ...getStarted,
  ...animations,
  ...textAnimations,
  ...components,
  ...backgrounds,
  ...PRO_MAP
};



// >>> foxbits:renames (generated by scripts/apply-renames.ts — do not edit)
componentMap['gradual-blur'] = componentMap['focus-pull'];
componentMap['blob-cursor'] = componentMap['goo-pointer'];
componentMap['animated-content'] = componentMap['motion-wrap'];
componentMap['magnet'] = componentMap['pointer-pull'];
componentMap['fade-content'] = componentMap['soft-entrance'];
componentMap['crosshair'] = componentMap['reticle'];
componentMap['shape-blur'] = componentMap['hazy-morph'];
componentMap['star-border'] = componentMap['twinkle-frame'];
componentMap['noise'] = componentMap['film-grain'];
componentMap['magnet-lines'] = componentMap['compass-field'];
componentMap['splash-cursor'] = componentMap['ripple-pointer'];
componentMap['click-spark'] = componentMap['tap-burst'];
componentMap['pixel-transition'] = componentMap['checker-dissolve'];
componentMap['pixel-swap'] = componentMap['shard-switch'];
componentMap['image-trail'] = componentMap['photo-wake'];
componentMap['pixel-trail'] = componentMap['square-wake'];
componentMap['ribbons'] = componentMap['streamers'];
componentMap['meta-balls'] = componentMap['blob-fusion'];
componentMap['metallic-paint'] = componentMap['chrome-ink'];
componentMap['glare-hover'] = componentMap['gloss-glide'];
componentMap['cubes'] = componentMap['voxel-cluster'];
componentMap['target-cursor'] = componentMap['lock-on-pointer'];
componentMap['sticker-peel'] = componentMap['decal-lift'];
componentMap['scroll-expand'] = componentMap['frame-bloom'];
componentMap['masked-heading'] = componentMap['stencil-title'];
componentMap['elastic-mesh'] = componentMap['spring-fabric'];
componentMap['ripple-distortion'] = componentMap['water-warp'];
componentMap['swarm-cursor'] = componentMap['flock-pointer'];
componentMap['halftone-reveal'] = componentMap['newsprint-lens'];
componentMap['electric-border'] = componentMap['voltage-frame'];
componentMap['laser-flow'] = componentMap['beam-cascade'];
componentMap['ghost-cursor'] = componentMap['phantom-pointer'];
componentMap['antigravity'] = componentMap['repel-field'];
componentMap['orbit-images'] = componentMap['photo-satellites'];
componentMap['magic-rings'] = componentMap['arcane-halos'];
componentMap['strands'] = componentMap['filament-weave'];
componentMap['cursor-grid'] = componentMap['pointer-cells'];
componentMap['split-text'] = componentMap['letter-break'];
componentMap['blur-text'] = componentMap['sharpen-type'];
componentMap['shiny-text'] = componentMap['sheen-sweep'];
componentMap['gradient-text'] = componentMap['rainbow-type'];
componentMap['count-up'] = componentMap['tally-climb'];
componentMap['decrypted-text'] = componentMap['cipher-reveal'];
componentMap['true-focus'] = componentMap['blur-relay'];
componentMap['variable-proximity'] = componentMap['magnetic-ink'];
componentMap['text-pressure'] = componentMap['squish-type'];
componentMap['ascii-text'] = componentMap['terminal-type'];
componentMap['falling-text'] = componentMap['gravity-letters'];
componentMap['rotating-text'] = componentMap['phrase-flip'];
componentMap['circular-text'] = componentMap['arc-type'];
componentMap['scroll-velocity'] = componentMap['momentum-marquee'];
componentMap['scroll-reveal'] = componentMap['into-focus'];
componentMap['scroll-float'] = componentMap['parallax-lift'];
componentMap['glitch-text'] = componentMap['static-type'];
componentMap['fuzzy-text'] = componentMap['tremor-type'];
componentMap['text-cursor'] = componentMap['word-trail'];
componentMap['scrambled-text'] = componentMap['smudge-type'];
componentMap['curved-loop'] = componentMap['ribbon-marquee'];
componentMap['text-type'] = componentMap['keystroke-reveal'];
componentMap['logo-loop'] = componentMap['brand-marquee'];
componentMap['shuffle'] = componentMap['riffle-type'];
componentMap['particle-text'] = componentMap['dust-type'];
componentMap['split-flap-text'] = componentMap['departure-board'];
componentMap['warp-text'] = componentMap['liquid-letters'];
componentMap['stroke-text'] = componentMap['outline-ink'];
componentMap['depth-text'] = componentMap['extruded-type'];
componentMap['fold-text'] = componentMap['origami-type'];
componentMap['echo-text'] = componentMap['afterimage-type'];
componentMap['text-loop'] = componentMap['path-marquee'];
componentMap['stack'] = componentMap['swipe-deck'];
componentMap['dock'] = componentMap['zoom-shelf'];
componentMap['spotlight-card'] = componentMap['beacon-tile'];
componentMap['border-glow'] = componentMap['halo-edge'];
componentMap['elastic-slider'] = componentMap['rubber-range'];
componentMap['decay-card'] = componentMap['dissolve-panel'];
componentMap['bounce-cards'] = componentMap['spring-deck'];
componentMap['pixel-card'] = componentMap['bitmap-panel'];
componentMap['tilted-card'] = componentMap['pivot-panel'];
componentMap['infinite-menu'] = componentMap['endless-rail'];
componentMap['flying-posters'] = componentMap['billboard-stream'];
componentMap['flowing-menu'] = componentMap['liquid-nav'];
componentMap['depth-carousel'] = componentMap['perspective-rail'];
componentMap['accordion-gallery'] = componentMap['concertina-panels'];
componentMap['morph-slider'] = componentMap['melt-reel'];
componentMap['drift-wall'] = componentMap['tile-stream'];
componentMap['circular-gallery'] = componentMap['ring-reel'];
componentMap['stepper'] = componentMap['stage-tracker'];
componentMap['carousel'] = componentMap['swipe-reel'];
componentMap['counter'] = componentMap['digit-roll'];
componentMap['lanyard'] = componentMap['badge-swing'];
componentMap['glass-icons'] = componentMap['frosted-glyphs'];
componentMap['animated-list'] = componentMap['reveal-list'];
componentMap['folder'] = componentMap['dossier'];
componentMap['gooey-nav'] = componentMap['taffy-tabs'];
componentMap['chroma-grid'] = componentMap['hue-tiles'];
componentMap['profile-card'] = componentMap['holo-badge'];
componentMap['card-swap'] = componentMap['deck-cycle'];
componentMap['model-viewer'] = componentMap['orbit-stage'];
componentMap['fluid-glass'] = componentMap['liquid-pane'];
componentMap['masonry'] = componentMap['patchwork-grid'];
componentMap['magic-bento'] = componentMap['spark-tiles'];
componentMap['scroll-stack'] = componentMap['pin-deck'];
componentMap['glass-surface'] = componentMap['crystal-panel'];
componentMap['pill-nav'] = componentMap['capsule-tabs'];
componentMap['card-nav'] = componentMap['panel-nav'];
componentMap['bubble-menu'] = componentMap['bloom-nav'];
componentMap['dome-gallery'] = componentMap['hemisphere-gallery'];
componentMap['staggered-menu'] = componentMap['waterfall-nav'];
componentMap['reflective-card'] = componentMap['mirror-pane'];
componentMap['line-sidebar'] = componentMap['proximity-nav'];
componentMap['curved-input'] = componentMap['arc-field'];
componentMap['option-wheel'] = componentMap['choice-dial'];
componentMap['specular-button'] = componentMap['rimlight-button'];
componentMap['silk'] = componentMap['satin-flow'];
componentMap['aurora'] = componentMap['polar-glow'];
componentMap['shape-grid'] = componentMap['geo-lattice'];
componentMap['hyperspeed'] = componentMap['warp-drive'];
componentMap['iridescence'] = componentMap['oil-slick'];
componentMap['grid-motion'] = componentMap['mesh-drift'];
componentMap['waves'] = componentMap['ripple-lines'];
componentMap['ballpit'] = componentMap['sphere-pool'];
componentMap['letter-glitch'] = componentMap['cipher-rain'];
componentMap['grid-distortion'] = componentMap['lattice-bend'];
componentMap['orb'] = componentMap['aura-sphere'];
componentMap['particles'] = componentMap['mote-field'];
componentMap['liquid-chrome'] = componentMap['mercury-flow'];
componentMap['balatro'] = componentMap['paint-vortex'];
componentMap['threads'] = componentMap['loom'];
componentMap['dither'] = componentMap['retro-static'];
componentMap['lightning'] = componentMap['storm-bolts'];
componentMap['dot-grid'] = componentMap['point-lattice'];
componentMap['beams'] = componentMap['crossing-bands'];
componentMap['ripple-grid'] = componentMap['wave-lattice'];
componentMap['dark-veil'] = componentMap['midnight-haze'];
componentMap['galaxy'] = componentMap['cosmos'];
componentMap['light-rays'] = componentMap['sun-shafts'];
componentMap['faulty-terminal'] = componentMap['crt-flicker'];
componentMap['plasma'] = componentMap['nebula-drift'];
componentMap['plasma-wave'] = componentMap['ion-swell'];
componentMap['prism'] = componentMap['crystal-spin'];
componentMap['gradient-blinds'] = componentMap['shutter-glow'];
componentMap['grainient'] = componentMap['speckle-wash'];
componentMap['prismatic-burst'] = componentMap['spectrum-flare'];
componentMap['pixel-blast'] = componentMap['square-burst'];
componentMap['liquid-ether'] = componentMap['ink-currents'];
componentMap['color-bends'] = componentMap['rainbow-drift'];
componentMap['line-waves'] = componentMap['warp-strings'];
componentMap['grid-scan'] = componentMap['wireframe-sweep'];
componentMap['floating-lines'] = componentMap['drifting-wires'];
componentMap['light-pillar'] = componentMap['glow-column'];
componentMap['pixel-snow'] = componentMap['retro-flurry'];
componentMap['radar'] = componentMap['sonar-sweep'];
componentMap['soft-aurora'] = componentMap['borealis-glow'];
componentMap['evil-eye'] = componentMap['ember-gaze'];
componentMap['dot-field'] = componentMap['stipple-surface'];
componentMap['side-rays'] = componentMap['edge-beams'];
componentMap['lightfall'] = componentMap['neon-downpour'];
componentMap['ferrofluid'] = componentMap['flux-pool'];
componentMap['molten-metal'] = componentMap['forge-swirl'];
componentMap['gradient-waves'] = componentMap['horizon-swells'];
componentMap['web-threads'] = componentMap['focal-fibers'];
componentMap['topography'] = componentMap['contour-field'];
componentMap['light-tunnel'] = componentMap['fiber-rush'];
componentMap['sliced-waves'] = componentMap['slat-ripple'];
componentMap['acid-squares'] = componentMap['crystal-corridor'];
componentMap['scanner'] = componentMap['signal-bands'];
// <<< foxbits:renames




// >>> foxbits:templates (generated by scripts/add-templates.ts — do not edit)
componentMap['ai-studio'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['altitude'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['auralis'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['baseline'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['codescan'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['creative-director'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['dantora'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['forma'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['gring-x'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['lumen'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['lumora'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['new-era'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['stride'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['vesper'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['voxelia'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['laocoon'] = () => import('../demo/Templates/TemplateDemo.jsx');
componentMap['soda'] = () => import('../demo/Templates/TemplateDemo.jsx');
// <<< foxbits:templates
