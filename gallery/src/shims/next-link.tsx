import { forwardRef } from "react";
// next/link → anchor. Two behaviors by design:
//  - hrefs under the app's BASE navigate the TOP window (landing → library);
//  - everything else (# anchors, template-internal paths) is inert, so
//    template previews can't navigate the gallery away.
const BASE = import.meta.env.BASE_URL;
const Link = forwardRef<HTMLAnchorElement, any>(function Link({ href, prefetch, scroll, replace, ...rest }, ref) {
  const url = typeof href === "string" ? href : "#";
  const isAppRoute = url.startsWith(BASE) && BASE !== "/" || (BASE === "/" && /^\/(library|get-started|text-animations|animations|components|backgrounds|deep-|templates)/.test(url));
  if (isAppRoute) return <a ref={ref} href={url} target="_top" {...rest} />;
  return <a ref={ref} href={url} onClick={(e: any) => e.preventDefault()} {...rest} />;
});
export default Link;
