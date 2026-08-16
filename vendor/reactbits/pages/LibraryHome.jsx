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
  const [subOf, setSubOf] = useState(null); // category index while drilled in (compact)
  const level = subOf != null ? CATEGORIES[subOf] : null;
  const sections = useMemo(
    () => CATEGORIES.map((c) => ({
      label: c.name,
      to: `/${slug(c.name)}/${slug(c.subcategories[0] ?? '')}`,
    })),
    [],
  );
  const items = level ? level.subcategories : sections.map((s) => s.label);

  useEffect(() => {
    // hero state: no other UI at all. A body class (styled in demo.css), not
    // inline styles — the navbar can re-render mid-route-change and a fresh
    // element would drop inline styles, leaving an invisible bar that still
    // swallows taps (it did — the Back button was unclickable).
    document.body.classList.add('p4rts-hero');
    return () => document.body.classList.remove('p4rts-hero');
  }, []);

  useEffect(() => {
    // items reveal one at a time (dash entry) — re-runs per drill level
    if (wrapRef.current) wrapRef.current.scrollTop = 0;
    const nodes = Array.from(document.querySelectorAll('.line-sidebar__item'));
    const perItem = level ? 0.06 : 0.4;
    const lead = level ? 0.1 : 0.35;
    nodes.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.animation = 'lh-entry 1.1s ease forwards';
      el.style.animationDelay = `${lead + i * perItem}s`;
    });
    return () => {
      nodes.forEach((el) => { el.style.opacity = ''; el.style.animation = ''; el.style.animationDelay = ''; });
    };
  }, [subOf, level]);

  const pickRoute = (to) => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    const el = wrapRef.current;
    if (el) { el.style.transition = 'opacity .6s ease'; el.style.opacity = '0'; }
    document.body.classList.add('p4rts-arrive');
    setTimeout(() => document.body.classList.remove('p4rts-arrive'), 2600);
    setTimeout(() => navigate(to), 620);
  };

  const choose = (index) => {
    if (leavingRef.current) return;
    if (level) {
      pickRoute(`/${slug(level.name)}/${slug(level.subcategories[index])}`);
      return;
    }
    if (compact) {
      setSubOf(index);
      return;
    }
    pickRoute(sections[index].to);
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
        @supports (height: 100dvh) {
          /* short/landscape phones: let the list scroll instead of clipping */
          .library-home { align-items: safe center; }
        }
        .lh-back {
          position: fixed; top: calc(16px + env(safe-area-inset-top, 0px)); left: 16px; z-index: 2;
          appearance: none; background: rgba(18,15,23,.82); border: 1px solid rgba(255,255,255,.18);
          border-radius: 999px; color: #fff; font-size: 13px; font-weight: 600; letter-spacing: .04em;
          padding: 10px 16px; min-height: 44px; cursor: pointer;
          animation: lh-entry .5s ease both;
        }
      `}</style>
      {level && (
        <button type="button" className="lh-back" onClick={() => setSubOf(null)}>
          ‹ Sections
        </button>
      )}
      <LineSidebar
        key={subOf ?? 'root'}
        items={items}
        accentColor="#a855f7"
        textColor="#c4c4c4"
        markerColor="#2FD8E8"
        showIndex
        showMarker
        proximityRadius={compact ? 70 : 100}
        maxShift={compact ? 16 : 30}
        falloff="smooth"
        markerLength={level ? 40 : compact ? 56 : 130}
        markerGap={0}
        tickScale={0.5}
        scaleTick
        itemGap={level ? 14 : compact ? 20 : 33}
        fontSize={level ? 0.95 : compact ? 1.05 : 1.35}
        smoothing={60}
        singleHighlight
        onItemClick={choose}
      />
    </div>
  );
};

export default LibraryHome;
