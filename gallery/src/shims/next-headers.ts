// server-only API shimmed for the browser: report the real user agent
export const headers = async () => ({
  get: (k: string) => (k.toLowerCase() === "user-agent" ? navigator.userAgent : null),
});
export const cookies = async () => ({ get: () => undefined, getAll: () => [] });
