# RIPPL — source template

This is the complete source for the **RIPPL** project (a PUDDL3 sibling brand), distributed as a GetLayers template.
It's a plain static site (HTML/CSS/JS) —
the full project tree, minus installed dependencies and any local secrets.

## Run it as-is

```sh
# No build step — it's a static site. Serve the folder over http:
npx serve .          # then open the printed URL
# or:  python3 -m http.server
```

> If the project needs environment variables (e.g. an API key), copy `.env.example` to
> `.env` (or `.env.local`) and fill it in — secrets are intentionally **not** included.

## Reuse it with your AI

Hand this whole folder to your AI coding assistant — Claude, Cursor, Copilot, v0 — and ask it
to adapt the parts you want into your own project, in any framework. The companion **prompt**
on the GetLayers listing rebuilds this same result as a single self-contained plain-HTML file;
this source bundle is the reference implementation behind it.
