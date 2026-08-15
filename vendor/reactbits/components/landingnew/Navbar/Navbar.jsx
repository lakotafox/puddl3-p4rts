import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../../common/SVGComponents';
import { useStars } from '../../../hooks/useStars';
import { GITHUB_URL } from '../../../constants/Site';
import { proLinkProps } from '../../../utils/pro';
import { FaGithub } from 'react-icons/fa6';
import { LuSearch, LuHeart, LuUser } from 'react-icons/lu';
import { useSearch } from '../../context/SearchContext/useSearch';
import { useOptions } from '../../context/OptionsContext/useOptions';
import { CATEGORIES } from '../../../constants/Categories';
import { PRO_SECTIONS } from '../../../constants/Pro';
import { TOOLS } from '../../../constants/Tools';
import jsIcon from '../../../assets/icons/js.svg';
import tsIcon from '../../../assets/icons/ts.svg';
import cssIcon from '../../../assets/icons/css.svg';
import twIcon from '../../../assets/icons/tw.svg';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Docs', to: '/get-started/introduction', match: '/get-started' }
];

const Navbar = ({ showDocs }) => {
  const stars = useStars();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const linksRef = useRef(null);
  const highlightRef = useRef(null);
  const prefsTimeoutRef = useRef(null);

  const { toggleSearch } = useSearch();
  const { languagePreset, setLanguagePreset, stylePreset, setStylePreset } = useOptions();
  const location = useLocation();

  const isActive = useCallback(match => location.pathname.startsWith(match), [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const positionHighlight = useCallback(el => {
    const highlight = highlightRef.current;
    const container = linksRef.current;
    if (!highlight || !container || !el) return;
    const linkRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    highlight.style.width = `${linkRect.width}px`;
    highlight.style.height = `${linkRect.height}px`;
    highlight.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
    highlight.style.opacity = '1';
  }, []);

  const getActiveEl = useCallback(() => {
    const container = linksRef.current;
    if (!container) return null;
    return container.querySelector('.ln-navbar-link-active');
  }, []);

  const handleLinkHover = useCallback(
    e => {
      positionHighlight(e.currentTarget);
    },
    [positionHighlight]
  );

  const handleLinksLeave = useCallback(() => {
    const activeEl = getActiveEl();
    if (activeEl) {
      positionHighlight(activeEl);
    } else {
      const highlight = highlightRef.current;
      if (highlight) highlight.style.opacity = '0';
    }
  }, [positionHighlight, getActiveEl]);

  // Position highlight on active link on mount and route change
  useEffect(() => {
    requestAnimationFrame(() => {
      const activeEl = getActiveEl();
      if (activeEl) positionHighlight(activeEl);
    });
  }, [location.pathname, positionHighlight, getActiveEl]);

  const formattedStars = useMemo(
    () => (typeof stars === 'number' ? (stars >= 1000 ? `${(stars / 1000).toFixed(1).replace(/\.0$/, '')}k` : stars) : stars),
    [stars]
  );

  const handlePrefsEnter = useCallback(() => {
    if (prefsTimeoutRef.current) clearTimeout(prefsTimeoutRef.current);
    setPrefsOpen(true);
  }, []);

  const handlePrefsLeave = useCallback(() => {
    prefsTimeoutRef.current = setTimeout(() => setPrefsOpen(false), 150);
  }, []);

  return (
    <header className={`ln-navbar${scrolled ? ' ln-navbar-scrolled' : ''}${showDocs ? ' ln-navbar-docs' : ''}`}>
      <div className="ln-navbar-inner">
        <div className="ln-navbar-left">
          <Link to="/" className="ln-navbar-logo">
            <Logo />
          </Link>

          <span className="ln-navbar-divider">/</span>

          <nav className="ln-navbar-links" ref={linksRef} onMouseLeave={handleLinksLeave}>
            <div className="ln-navbar-link-highlight" ref={highlightRef} />
            {NAV_LINKS.map(({ label, to, match }) => (
              <Link
                key={to}
                className={`ln-navbar-link${isActive(match) ? ' ln-navbar-link-active' : ''}`}
                to={to}
                onMouseEnter={handleLinkHover}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ln-navbar-right">
          {showDocs && (
            <>
              <Link to="/templates/ai-studio" className="ln-navbar-link">TEMPLATES</Link>
              <button className="ln-navbar-icon-btn ln-navbar-search-btn" onClick={toggleSearch} aria-label="Search">
                <LuSearch size={15} />
                <span className="ln-navbar-search-text">Search...</span>
                <kbd className="ln-navbar-kbd">/</kbd>
              </button>
            </>
          )}

          

          <a className="ln-navbar-github" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <FaGithub size={16} color="#fff" />
            <span>{formattedStars}</span>
          </a>

          <button
            className={`ln-navbar-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && !showDocs && (
          <div className="ln-navbar-mobile-menu">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} className="ln-navbar-mobile-link" to={to} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <span className="ln-navbar-mobile-link">
              Community <span className="ln-navbar-soon">Soon</span>
            </span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ln-navbar-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaGithub size={14} /> GitHub
              </span>
              <span style={{ opacity: 0.6 }}>{formattedStars}</span>
            </a>
          </div>
        )}

        {menuOpen &&
          showDocs &&
          createPortal(
            <>
              <div className="ln-navbar-mobile-backdrop" onClick={() => setMenuOpen(false)} />
              <div className="ln-navbar-mobile-menu ln-navbar-mobile-menu-docs">
                <div className="ln-navbar-mobile-scroll">
                  {CATEGORIES.map((cat, i) => {
                    const slug = str => str.replace(/\s+/g, '-').toLowerCase();
                    return (
                      <div className="ln-navbar-mobile-section" key={cat.name}>
                        <span className="ln-navbar-mobile-label">{cat.name}</span>
                        {cat.subcategories.map(sub => (
                          <Link
                            key={sub}
                            className="ln-navbar-mobile-link"
                            to={`/${slug(cat.name)}/${slug(sub)}`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {sub}
                          </Link>
                        ))}
                        {i === 0 && (
                          <>
                            {/* Mirrors the desktop sidebar, where Pro sits directly
                                below Get Started and above Tools. */}
                            <span className="ln-navbar-mobile-label" style={{ marginTop: 12 }}>
                              Pro
                            </span>
                            <Link className="ln-navbar-mobile-link" to="/pro" onClick={() => setMenuOpen(false)}>
                              Overview
                            </Link>
                            {PRO_SECTIONS.map(section => (
                              <Link
                                key={section.slug}
                                className="ln-navbar-mobile-link"
                                to={`/pro/${section.slug}`}
                                onClick={() => setMenuOpen(false)}
                              >
                                {section.label}
                              </Link>
                            ))}

                            <span className="ln-navbar-mobile-label" style={{ marginTop: 12 }}>
                              Tools
                            </span>
                            {TOOLS.map(tool => (
                              <Link
                                key={tool.id}
                                className="ln-navbar-mobile-link"
                                to={tool.path}
                                onClick={() => setMenuOpen(false)}
                              >
                                {tool.label}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>,
            document.body
          )}
      </div>
    </header>
  );
};

export default Navbar;
