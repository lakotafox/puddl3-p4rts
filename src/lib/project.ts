import { join, dirname, resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { exists, readJson, HOME } from "./vault.ts";

export type Target = {
  root: string;
  componentsDir: string;   // absolute
  alias: string;           // import prefix, e.g. "@/components"
  tsx: boolean;
  tailwind: 3 | 4 | null;
  pm: "bun" | "pnpm" | "yarn" | "npm";
  deps: Record<string, string>;
};

/** Walk up from `start` to the nearest package.json. */
export async function findRoot(start: string): Promise<string> {
  let dir = resolve(start);
  while (true) {
    if (await exists(join(dir, "package.json"))) return dir;
    const up = dirname(dir);
    if (up === dir) throw new Error(`No package.json found at or above ${start}`);
    dir = up;
  }
}

async function detectTailwind(root: string, pkg: any): Promise<3 | 4 | null> {
  const all = { ...pkg?.dependencies, ...pkg?.devDependencies };
  const v = all?.tailwindcss as string | undefined;
  if (v) {
    const major = Number(v.replace(/[^\d.]/g, "").split(".")[0]);
    if (major >= 4) return 4;
    if (major === 3) return 3;
  }
  // v4 has no tailwind.config by default; it uses a CSS-side @import.
  for (const f of ["app/globals.css", "src/app/globals.css", "src/index.css", "styles/globals.css"]) {
    try {
      const css = await readFile(join(root, f), "utf8");
      if (/@import\s+["']tailwindcss["']/.test(css)) return 4;
      if (/@tailwind\s+base/.test(css)) return 3;
    } catch { /* not there */ }
  }
  return null;
}

/** Resolve a components.json alias like "@/components" through tsconfig paths. */
async function resolveAlias(root: string, alias: string): Promise<string | null> {
  const ts = (await readJson<any>(join(root, "tsconfig.json"))) ?? (await readJson<any>(join(root, "jsconfig.json")));
  const paths = ts?.compilerOptions?.paths as Record<string, string[]> | undefined;
  if (!paths) return null;
  for (const [pattern, targets] of Object.entries(paths)) {
    const prefix = pattern.replace(/\*$/, "");
    if (!alias.startsWith(prefix)) continue;
    const remainder = alias.slice(prefix.length);
    const base = targets[0]!.replace(/\*$/, "");
    return join(root, ts.compilerOptions.baseUrl ?? ".", base, remainder);
  }
  return null;
}

export async function inspectTarget(dir: string): Promise<Target> {
  const root = await findRoot(dir);
  if (root === HOME) throw new Error("Refusing to add into the PUDDL3 P4RTS repo itself. Use --to <dir>.");

  const pkg = await readJson<any>(join(root, "package.json"));
  const cj = await readJson<any>(join(root, "components.json"));

  const alias: string = cj?.aliases?.components ?? "@/components";
  let componentsDir = (await resolveAlias(root, alias)) ?? null;
  if (!componentsDir) {
    componentsDir = (await exists(join(root, "src"))) ? join(root, "src/components") : join(root, "components");
  }

  const pm: Target["pm"] = (await exists(join(root, "bun.lock"))) || (await exists(join(root, "bun.lockb")))
    ? "bun"
    : (await exists(join(root, "pnpm-lock.yaml"))) ? "pnpm"
    : (await exists(join(root, "yarn.lock"))) ? "yarn"
    : "npm";

  return {
    root,
    componentsDir,
    alias,
    tsx: cj?.tsx !== false,
    tailwind: await detectTailwind(root, pkg),
    pm,
    deps: { ...pkg?.dependencies, ...pkg?.devDependencies },
  };
}

export function installCmd(pm: Target["pm"], deps: string[]): string {
  const verb = pm === "npm" ? "install" : "add";
  return `${pm} ${verb} ${deps.join(" ")}`;
}
