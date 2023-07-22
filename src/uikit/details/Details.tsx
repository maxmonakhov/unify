import { memo, PropsWithChildren, useState } from "react";
import { ArrowIcon } from "@/uikit/icons";
import clsx from "clsx";

type DetailsProps = PropsWithChildren & {
  className?: string;
};

const Details = (props: DetailsProps) => {
  const { children, className } = props;

  const [state, setState] = useState<"collapsed" | "expanded">("collapsed");

  const handleClick = () => {
    if (state === "expanded") setState("collapsed");
    else setState("expanded");
  };

  return (
    <div className={className}>
      <button className="flex items-center gap-2.5 text-violet" onClick={handleClick}>
        Details <ArrowIcon className={clsx("transition", { "rotate-180": state === "expanded" })} />
      </button>
      {state === "expanded" && children}
    </div>
  );
};

export default memo(Details);
