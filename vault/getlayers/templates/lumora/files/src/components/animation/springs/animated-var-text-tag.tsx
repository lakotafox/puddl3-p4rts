// 📖 Docs: obsidian/frontend/components/animation-springs.md
import { Tags } from "@/types/springs";
import { animated, ElementType } from "@react-spring/web";
import {
  CSSProperties,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from "react";

export interface VarTextTagProps {
  tag?: Tags;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export const AnimatedVarTextTag = forwardRef<HTMLElement, VarTextTagProps>(
  ({ tag = "span", children, className, style, ...props }, outerRef) => {
    const ref = useRef<HTMLElement | null>(null);
    useImperativeHandle(outerRef, () => ref.current as HTMLElement);
    const Tag = animated[tag] as ElementType;

    return (
      // react-spring serializes a SpringValue's initial style differently on
      // the server (normalised, e.g. `rgba(241, 240, 238, 0)`) than the
      // client's pre-animation read (`rgba(241,240,238,0)`), so React reports a
      // hydration mismatch on the style attribute. The library drives styles
      // imperatively via the ref after mount, so the server value is never
      // user-visible — suppress the diff on these animated nodes only.
      <Tag
        ref={ref}
        className={className}
        style={style}
        suppressHydrationWarning
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
AnimatedVarTextTag.displayName = "AnimatedVarTextTag";
