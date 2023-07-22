import { memo, PropsWithChildren, useState } from "react";

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
      <div>
        <button onClick={handleClick}>Details </button>
      </div>
      {state === "expanded" && children}
    </div>
  );
};

export default memo(Details);
