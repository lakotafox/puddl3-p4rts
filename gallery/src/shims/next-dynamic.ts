import { lazy } from "react";
export default function dynamic(loader: any, _opts?: any) {
  return lazy(async () => {
    const mod = await (typeof loader === "function" ? loader() : loader);
    return { default: mod.default ?? mod };
  });
}
