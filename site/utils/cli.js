const variantForShadcn = (language, style) =>
  `${(language || 'JS').toUpperCase()}-${(style || 'CSS').toUpperCase().replace('TAILWIND', 'TW')}`;

const UPPERCASE_PARTS = new Set(['ascii']);

const slugToComponentName = slug => {
  if (!slug) return '';
  return slug
    .split('-')
    .map(part => {
      if (UPPERCASE_PARTS.has(part.toLowerCase())) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
};

export const generateCliCommands = (language, style, category, subcategory, dependencies = '') => {
  if (!category || !subcategory) return null;

  // foxbits:own-ecosystem — every component installs from the local PUDDL3
  // P4RTS vault via the p4rts CLI (or copy the code / use the MCP server).
  // No external registries, no license keys.
  const slug = subcategory.replace(/-pro$/, '');
  const cmd = `p4rts add ${slug}`;
  const cmds = { pnpm: cmd, npx: cmd, yarn: cmd, bun: cmd };
  return { shadcn: cmds, jsrepo: cmds };
};
