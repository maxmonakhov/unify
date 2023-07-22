import { ComponentProps, memo } from "react";
import clsx from "clsx";

type ButtonProps = ComponentProps<"button"> & {};

const Button = (props: ButtonProps) => {
  const { className, ...restButtonProps } = props;

  return (
    <button
      className={clsx(
        "flex items-center gap-2 rounded-2xl bg-violet px-8 py-[18px] text-[20px] font-semibold text-white transition hover:bg-violetLight disabled:cursor-not-allowed",
        className
      )}
      {...restButtonProps}
    />
  );
};

export default memo(Button);
