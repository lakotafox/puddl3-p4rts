import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LineSidebar from '../components/common/LineSidebar/LineSidebar';
import RetroFlurry from '../content/Backgrounds/RetroFlurry/RetroFlurry';
import { CATEGORIES } from '../constants/Categories';

// /library — the boss-dash hero picker (user, 2026-08-15): ONLY the centered
// LineSidebar exists — navbar and the real sidebar stay hidden. Picking a
// section fades the picker away, then the app's UI fades in on the destination
// with the chosen category open (the collapsible sidebar auto-opens the
// active route's section).
const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');

const LibraryHome = () => {
  const navigate = useNavigate();
  const wrapRef = useRef(null);
  const leavingRef = useRef(false);
  const sections = useMemo(
    () => CATEGORIES.map((c) => ({
      label: c.name,
      to: `/${slug(c.name)}/${slug(c.subcategories[0] ?? '')}`,
    })),
    [],
  );

  useEffect(() => {
    // hero state: no other UI at all
    const chrome = [document.querySelector('.ln-navbar'), document.querySelector('.sidebar')];
    chrome.forEach((el) => { if (el) { el.style.opacity = '0'; el.style.pointerEvents = 'none'; } });
    // picker items reveal one at a time (dash entry)
    const items = Array.from(document.querySelectorAll('.line-sidebar__item'));
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.animation = 'lh-entry 1.1s ease forwards';
      el.style.animationDelay = `${0.35 + i * 0.4}s`;
    });
    return () => {
      chrome.forEach((el) => { if (el) { el.style.opacity = ''; el.style.pointerEvents = ''; } });
      items.forEach((el) => { el.style.opacity = ''; el.style.animation = ''; el.style.animationDelay = ''; });
    };
  }, []);

  const pick = (index) => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    const el = wrapRef.current;
    if (el) { el.style.transition = 'opacity .6s ease'; el.style.opacity = '0'; }
    document.body.classList.add('p4rts-arrive');
    setTimeout(() => document.body.classList.remove('p4rts-arrive'), 2600);
    setTimeout(() => navigate(sections[index].to), 620);
  };

  return (
    <div className="library-home" ref={wrapRef}>
      <style>{`
        @keyframes lh-entry { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .library-home {
          position: fixed; inset: 0; z-index: 30;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-body, #0a0a0d);
        }
        .library-home .lh-bg {
          position: absolute; inset: 0; pointer-events: none;
          opacity: 0; animation: lh-bg-in 2s ease .2s forwards;
        }
        @keyframes lh-bg-in { to { opacity: 1; } }
        .library-home .line-sidebar { position: relative; z-index: 1; }
      `}</style>
      <div className="lh-bg">
        <RetroFlurry
          color="#ffffff"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
        />
      </div>
      <LineSidebar
        items={sections.map((s) => s.label)}
        accentColor="#a855f7"
        textColor="#c4c4c4"
        markerColor="#2FD8E8"
        showIndex
        showMarker
        proximityRadius={100}
        maxShift={30}
        falloff="smooth"
        markerLength={130}
        markerGap={0}
        tickScale={0.5}
        scaleTick
        itemGap={33}
        fontSize={1.35}
        smoothing={60}
        singleHighlight
        onItemClick={pick}
      />
    </div>
  );
};

export default LibraryHome;
