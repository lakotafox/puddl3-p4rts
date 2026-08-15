// Basic-auth gate for the whole site — founders only.
// Password lives in the P4RTS_PASSWORD env var on Netlify (Site settings →
// Environment variables); username is anything.
export default async (request: Request, context: any) => {
  const expected = Deno.env.get("P4RTS_PASSWORD") ?? "puddl3";
  const auth = request.headers.get("authorization") ?? "";
  if (auth.startsWith("Basic ")) {
    try {
      const [, pass] = atob(auth.slice(6)).split(":");
      if (pass === expected) return context.next();
    } catch { /* fall through */ }
  }
  return new Response("PUDDL3 P4RTS — founders only", {
    status: 401,
    headers: { "www-authenticate": 'Basic realm="PUDDL3 P4RTS"' },
  });
};
export const config = { path: "/*" };
