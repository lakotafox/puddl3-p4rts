import { useEffect } from 'react';

// /library — styled after the PUDDL3 app's start screen (lakotafox.com/puddl3):
// a dead-quiet centered column — micro uppercase labels, a thin underlined
// row, one big rounded dark button, a small footnote link. Background comes
// later (user, 2026-08-15). The sidebar keeps the employer-dash entry:
// sections reveal one at a time, header dead last.
const LibraryHome = () => {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.sidebar .category-name'));
    const navbar = document.querySelector('.ln-navbar');
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.animation = 'lh-entry 1.1s ease forwards';
      el.style.animationDelay = `${0.5 + i * 0.55}s`;
    });
    if (navbar) {
      navbar.style.opacity = '0';
      navbar.style.animation = 'lh-entry 1.3s ease forwards';
      navbar.style.animationDelay = `${0.5 + items.length * 0.55 + 0.3}s`;
    }
    return () => {
      [...items, navbar].forEach((el) => {
        if (!el) return;
        el.style.opacity = ''; el.style.animation = ''; el.style.animationDelay = '';
      });
    };
  }, []);

  return (
    <div className="library-home">
      <style>{`
        @keyframes lh-entry { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .library-home {
          min-height: calc(100vh - 160px);
          display: flex; align-items: center; justify-content: center;
        }
        .lh-col {
          width: min(300px, 86vw);
          display: flex; flex-direction: column;
          opacity: 0; animation: lh-entry .5s ease .15s forwards;
        }
        .lh-label {
          font-size: 11px; letter-spacing: .22em; font-weight: 600;
          color: #94a3b8; text-transform: uppercase; margin-bottom: 10px;
        }
        .lh-row {
          color: #64748b; font-size: 15px; padding: 6px 2px 12px;
          border-bottom: 1px solid rgba(148,163,184,.25); margin-bottom: 34px;
        }
        .lh-btn {
          display: block; width: 100%; text-align: center; text-decoration: none;
          background: transparent; color: #e5e7eb; font-size: 15px;
          border: 1px solid rgba(148,163,184,.25); border-radius: 12px;
          padding: 13px 0; transition: background .2s ease;
        }
        .lh-btn:hover { background: rgba(148,163,184,.08); }
        .lh-foot { margin-top: 26px; font-size: 14px; color: #64748b; }
        .lh-foot a { color: #22d3ee; text-decoration: none; font-weight: 600; }
      `}</style>

      <div className="lh-col">
        <div className="lh-label">PUDDL3 P4RTS</div>
        <div className="lh-row">pick a part — any hour, any day</div>
        <a className="lh-btn" href="text-animations/letter-break"
           onClick={(e) => { e.preventDefault(); window.location.href = `${import.meta.env.BASE_URL}text-animations/letter-break`; }}>
          Browse components
        </a>
        <div className="lh-foot">
          New here? <a href="get-started/introduction"
            onClick={(e) => { e.preventDefault(); window.location.href = `${import.meta.env.BASE_URL}get-started/introduction`; }}>
            Read the intro
          </a>
        </div>
      </div>
    </div>
  );
};

export default LibraryHome;
