import { forwardRef } from "react";
// next/image → plain img. fill maps to absolute-inset cover, like next does.
const Image = forwardRef<HTMLImageElement, any>(function Image(
  { src, alt = "", fill, priority, quality, placeholder, blurDataURL, loader, unoptimized, sizes, style, ...rest }, ref) {
  const url = typeof src === "object" && src ? src.src ?? src.default?.src ?? "" : src;
  const s = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style } : style;
  return <img ref={ref} src={url} alt={alt} style={s} {...rest} />;
});
export default Image;
