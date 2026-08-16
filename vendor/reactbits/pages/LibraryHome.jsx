import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LineSidebar from '../components/common/LineSidebar/LineSidebar';
import { CATEGORIES } from '../constants/Categories';

// /library — the boss-dash hero picker (user, 2026-08-15): ONLY the centered
// LineSidebar exists — navbar and the real sidebar stay hidden. Picking a
// section fades the picker away, then the app's UI fades in on the destination
// with the chosen category open.
//
// Compact (phone) mode is TWO-LEVEL (user, 2026-08-16): the hamburger lands
// here, tapping a section swaps the list for that section's components
// (drill-down happens on the picker, not in a drawer), and a Back control
// returns to the sections. Desktop keeps the direct one-tap flow.
const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');

// per-tab: the staggered reveal is a one-time first impression
const FIRST_RUN_KEY = 'p4rts-picker-intro';

// LineSidebar has no media queries of its own; on phones the desktop props
// (130px marker gutter + 1.35rem labels + 30px shift) overflow a 390px screen.
const useCompact = () => {
  const [compact, setCompact] = useState(
    () => window.matchMedia('(max-width: 640px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = (e) => setCompact(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return compact;
};

const LibraryHome = () => {
  const navigate = useNavigate();
  const wrapRef = useRef(null);
  const leavingRef = useRef(false);
  const compact = useCompact();
  // Sections expand IN PLACE (user, 2026-08-16) — tapping one reveals its
  // components right under it in the same list, like the desktop sidebar. No
  // second screen, no back button. Rows are flattened into LineSidebar's flat
  // items array and mapped back on click.
  const [openCat, setOpenCat] = useState(null);
  const rows = useMemo(() => {
    const out = [];
    CATEGORIES.forEach((c, ci) => {
      out.push({ kind: 'cat', ci, label: c.name });
      if (openCat === ci) {
        c.subcategories.forEach((sub, si) =>
          out.push({ kind: 'sub', ci, si, label: `   ${sub}` }),
        );
      }
    });
    return out;
  }, [openCat]);
  const items = rows.map((r) => r.label);
  const expanded = openCat != null;

  // Hero state: no other UI at all. A body class (styled in demo.css), not
  // inline styles — the navbar can re-render mid-route-change and a fresh
  // element would drop inline styles, leaving an invisible bar that still
  // swallows taps (it did — the Back button was unclickable).
  // Set during render, not in an effect: an effect runs after the first paint,
  // so the navbar/sidebar flashed before hiding.
  if (typeof document !== 'undefined') document.body.classList.add('p4rts-hero');
  useEffect(() => {
    document.body.classList.add('p4rts-hero');
    // Hand over from the pre-React boot style (index.html) — it holds a dark,
    // chrome-free screen until the picker is up. It MUST be torn down here: it
    // carries `.category-page { opacity: 0 }` and an opaque background, so
    // leaving it in place blanked every page reached from the picker and hid
    // the snow (only a hard reload, which skips it, looked fine).
    document.getElementById('p4rts-boot')?.remove();
    return () => document.body.classList.remove('p4rts-hero');
  }, []);

  // The slow one-at-a-time reveal is a first-impression beat: it plays once per
  // tab, on the first arrival from the landing (user, 2026-08-16). Decided in a
  // ref, not inside the effect — StrictMode double-invokes effects, so the
  // second pass would always read the flag it just wrote and never stagger.
  const firstRunRef = useRef(null);
  if (firstRunRef.current === null) {
    firstRunRef.current = sessionStorage.getItem(FIRST_RUN_KEY) !== 'done';
    if (firstRunRef.current) sessionStorage.setItem(FIRST_RUN_KEY, 'done');
  }

  useEffect(() => {
    // Later visits — hamburger, expand, collapse — fade the whole list in at
    // once, once the outgoing content has cleared.
    const nodes = Array.from(document.querySelectorAll('.line-sidebar__item'));
    const stagger = firstRunRef.current && !expanded;
    nodes.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.animation = stagger ? 'lh-entry 1.1s ease forwards' : 'lh-entry .45s ease forwards';
      el.style.animationDelay = stagger ? `${0.35 + i * 0.4}s` : '.1s';
    });
    firstRunRef.current = false;
    return () => {
      nodes.forEach((el) => { el.style.opacity = ''; el.style.animation = ''; el.style.animationDelay = ''; });
    };
  }, [openCat, expanded]);

  const pickRoute = (to) => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    const el = wrapRef.current;
    if (el) { el.style.transition = 'opacity .45s ease'; el.style.opacity = '0'; }
    // The arrival choreography starts WITH the navigation, not at click time.
    // Added early it ran against the outgoing picker (itself a .category-wrapper
    // child, so the fade-in rule dragged it back to visible mid-exit) and burned
    // its delays before the destination existed — the navbar then snapped in
    // ahead of an empty page (user, 2026-08-16).
    setTimeout(() => {
      document.body.classList.add('p4rts-arrive');
      navigate(to);
      setTimeout(() => document.body.classList.remove('p4rts-arrive'), 2200);
    }, 460);
  };

  // The site-wide snow lives in gallery/src/main.tsx (outside this tree), so the
  // control talks to it by event and shares its localStorage key.
  const [snowOn, setSnowOn] = useState(() => localStorage.getItem('p4rts-snow') !== 'off');
  const toggleSnow = () => {
    const next = !snowOn;
    setSnowOn(next);
    window.dispatchEvent(new CustomEvent('p4rts-snow', { detail: next }));
  };

  const choose = (index) => {
    if (leavingRef.current) return;
    const row = rows[index];
    if (!row) return;
    if (row.kind === 'cat') {
      setOpenCat((cur) => (cur === row.ci ? null : row.ci));
      return;
    }
    const cat = CATEGORIES[row.ci];
    pickRoute(`/${slug(cat.name)}/${slug(cat.subcategories[row.si])}`);
  };

  return (
    <div className="library-home" ref={wrapRef}>
      <style>{`
        @keyframes lh-entry { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .library-home {
          position: fixed; inset: 0; z-index: 30;
          display: flex; align-items: center; justify-content: center;
          overflow-y: auto; padding: 32px 0;
          /* transparent — the site-wide SiteFlurry (main.tsx) is the backdrop,
             and it stays put while the picker fades, carrying into the app */
        }
        .library-home .line-sidebar { position: relative; z-index: 1; }
        /* Items start hidden in CSS, not from the effect: the effect runs after
           the first paint, so the full list flashed on screen and then vanished
           to stagger back in (user, 2026-08-16). */
        .library-home .line-sidebar__item { opacity: 0; }
        .lh-snow {
          position: fixed; z-index: 2;
          top: calc(18px + env(safe-area-inset-top, 0px)); right: 18px;
          appearance: none; background: none; border: 0; padding: 10px 4px;
          min-height: 44px; cursor: pointer;
          color: #8b8b93; font-size: 12px; font-weight: 600; letter-spacing: .06em;
          text-transform: uppercase;
        }
        .lh-snow:hover { color: #fff; }
        @supports (height: 100dvh) {
          /* short/landscape phones: let the list scroll instead of clipping */
          .library-home { align-items: safe center; }
        }
        .library-home .line-sidebar__text { white-space: pre; }
      `}</style>
      <button type="button" className="lh-snow" onClick={toggleSnow}>
        {snowOn ? 'Disable snow' : 'Enable snow'}
      </button>
      <LineSidebar
        items={items}
        accentColor="#a855f7"
        textColor="#c4c4c4"
        markerColor="#2FD8E8"
        showIndex={!expanded}
        showMarker
        proximityRadius={compact ? 70 : 100}
        maxShift={compact ? 16 : 30}
        falloff="smooth"
        markerLength={expanded ? 40 : compact ? 56 : 130}
        markerGap={0}
        tickScale={0.5}
        scaleTick
        itemGap={expanded ? 14 : compact ? 20 : 33}
        fontSize={expanded ? 0.95 : compact ? 1.05 : 1.35}
        smoothing={60}
        singleHighlight
        onItemClick={choose}
      />
    </div>
  );
};

export default LibraryHome;
