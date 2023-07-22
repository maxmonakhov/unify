import { memo } from "react";
import clsx from "clsx";
import { SpinnerIcon } from "@/uikit/icons/Spinner";

type SpinnerProps = {
  className?: string;
};

const Spinner = (props: SpinnerProps) => {
  const { className } = props;

  return <SpinnerIcon className={clsx("animate-spin", className)} />;
};

export default memo(Spinner);
