import { memo, ReactNode } from "react";
import clsx from "clsx";

type LabelProps = {
  icon: ReactNode;
  text: string;
  className?: string;
};

const Label = (props: LabelProps) => {
  const { text, icon, className } = props;

  return (
    <div
      className={clsx("flex gap-2 rounded-[10px] border border-solid border-violet p-2", className)}
    >
      <div className="h-5 w-5 text-violet">{icon}</div>
      <span className="text-[16px]">{text}</span>
    </div>
  );
};

export default memo(Label);
