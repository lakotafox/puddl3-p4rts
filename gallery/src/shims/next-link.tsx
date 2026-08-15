import { forwardRef } from "react";
const Link = forwardRef<HTMLAnchorElement, any>(function Link({ href, prefetch, scroll, replace, ...rest }, ref) {
  return <a ref={ref} href={typeof href === "string" ? href : "#"} onClick={(e) => e.preventDefault()} {...rest} />;
});
export default Link;
