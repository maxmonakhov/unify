import { memo } from "react";
import { LogoIcon } from "@/uikit/icons/Logo";
import clsx from "clsx";

type LogoWithTextProps = { className?: string };

const LogoWithText = (props: LogoWithTextProps) => {
  const { className } = props;

  return (
    <div className={clsx("flex items-center gap-2.5 text-[24px]", className)}>
      <LogoIcon /> Unify
    </div>
  );
};

export default memo(LogoWithText);
