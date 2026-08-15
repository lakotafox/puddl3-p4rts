import { useParams } from 'react-router-dom';
import { TEMPLATE_INDEX } from '../../constants/TemplatesCatalog';

// Full-page live preview of a GetLayers template (PUDDL3-branded), straight
// from the vault via /template.html (isolated iframe) or /scene/ (vanilla).
const TemplateDemo = () => {
  const { subcategory } = useParams();
  const meta = TEMPLATE_INDEX[subcategory];
  if (!meta) return <div style={{ padding: 24, color: '#f87171' }}>Unknown template: {subcategory}</div>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: 'calc(100vh - 140px)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{meta.title}</h2>
        <span style={{ opacity: 0.55, fontSize: 13 }}>
          {meta.brand}{meta.tagline ? ` — ${meta.tagline}` : ''}
        </span>
        <span style={{ flex: 1 }} />
        <a href={meta.stage} target="_blank" rel="noreferrer"
           style={{ fontSize: 13, color: '#a78bfa', textDecoration: 'none' }}>
          open full ↗
        </a>
      </div>
      <iframe
        src={meta.stage}
        title={meta.title}
        style={{ flex: 1, width: '100%', border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, background: '#000' }}
      />
    </div>
  );
};

export default TemplateDemo;
