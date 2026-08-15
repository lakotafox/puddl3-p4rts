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

  // foxbits:pro-cli — Pro components install from the reactbits-starter
  // registry with -tw/-css suffixes; language preset does not apply (TS only).
  if (category.startsWith('pro-') || category.startsWith('deep-')) {
    const proSlug = subcategory.replace(/-pro$/, '');
    const suffix = (style || 'TAILWIND').toUpperCase().startsWith('C') ? 'css' : 'tw';
    const target = `@reactbits-starter/${proSlug}-${suffix}`;
    const prefixes = { pnpm: 'pnpm dlx', npx: 'npx', yarn: 'yarn', bun: 'bun x --bun' };
    const cmds = Object.fromEntries(
      Object.entries(prefixes).map(([mgr, prefix]) => [mgr, `${prefix} shadcn@latest add ${target}`])
    );
    return { shadcn: cmds, jsrepo: cmds };
  }

  const shadcnVariant = variantForShadcn(language, style);

  const componentName = slugToComponentName(subcategory);
  const baseUrl = 'https://reactbits.dev';

  const jsrepoUrl = `${baseUrl}/r/${componentName}-${shadcnVariant}`;
  const shadcnUrl = `@react-bits/${componentName}-${shadcnVariant}`;

  const prefixCommands = {
    pnpm: 'pnpm dlx',
    npx: 'npx',
    yarn: 'yarn',
    bun: 'bun x --bun'
  };

  const jsrepo = Object.fromEntries(
    Object.entries(prefixCommands).map(([mgr, prefix]) => [mgr, `${prefix} jsrepo@latest add ${jsrepoUrl}`])
  );

  const shadcn = Object.fromEntries(
    Object.entries(prefixCommands).map(([mgr, prefix]) => [mgr, `${prefix} shadcn@latest add ${shadcnUrl}`])
  );

  const depsString = typeof dependencies === 'string' ? dependencies.trim() : '';
  const manual = depsString
    ? {
        pnpm: `pnpm add ${depsString}`,
        npm: `npm install ${depsString}`,
        yarn: `yarn add ${depsString}`,
        bun: `bun add ${depsString}`
      }
    : null;

  return { manual, jsrepo, shadcn };
};
