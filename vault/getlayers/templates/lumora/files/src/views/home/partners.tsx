import { Inview } from "@/components/animation/springs/in-view";
import { Hover } from "@/components/animation/springs/hover";
import { CircleDotIcon } from "@/components/ui/icons";
import type { Partner } from "@/data/mocks/home";

export interface PartnersProps {
  label: string;
  partners: Partner[];
  /** Gate the entrance animation on the intro loader. */
  enabled?: boolean;
}

/** Compact partner-logo grid shown beneath the hero card. */
export const Partners = ({ label, partners, enabled = true }: PartnersProps) => {
  return (
    <Inview
      tag="div"
      mode="once"
      enabled={enabled}
      from={{ opacity: 0, transform: "translateY(14px)" }}
      to={{ opacity: 1, transform: "translateY(0px)" }}
      config={{ tension: 200, friction: 24 }}
      delayIn={550}
      className="w-full max-w-sm lg:w-[19rem]"
    >
      <p className="mb-3 text-left text-xs font-medium text-foreground/45 lg:text-right">
        {label}
      </p>
      <ul className="grid grid-cols-4 gap-x-4 gap-y-3">
        {partners.map((partner, index) => (
          <li key={`${partner.name}-${index}`}>
            <Hover
              tag="span"
              from={{ transform: "translateY(0px)", opacity: 0.7 }}
              to={{ transform: "translateY(-2px)", opacity: 1 }}
              config={{ tension: 320, friction: 20 }}
              className="flex items-center gap-1.5 text-xs text-foreground/70"
            >
              <CircleDotIcon className="text-sm text-foreground/40" />
              <span className="truncate">{partner.name}</span>
            </Hover>
          </li>
        ))}
      </ul>
    </Inview>
  );
};
