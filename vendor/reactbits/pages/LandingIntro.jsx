// PUDDL3 P4RTS landing (user, 2026-08-15): the stripped GringX hero — hello,
// intro, one Get Started that fades out and lands on /library. Full-bleed
// iframe; the template's own links use target="_top" via the next/link shim.
const LandingIntro = () => (
  <iframe
    src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/template.html?t=gring-x`}
    title="PUDDL3 P4RTS"
    style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', border: 0, background: '#050505' }}
  />
);

export default LandingIntro;
