import { useState } from 'react';

// p4rts-fold: collapsed by default; the grid wraps only the controls so the
// header button sits outside .preview-options.
const Customize = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="p4rts-fold">
      <button type="button" className="p4rts-fold-head" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <h2 className="demo-title-extra">Customize</h2>
        <span className={`p4rts-fold-chev${open ? ' is-open' : ''}`} aria-hidden="true">▾</span>
      </button>
      {open && <div className="preview-options">{children}</div>}
    </section>
  );
};

export default Customize;
