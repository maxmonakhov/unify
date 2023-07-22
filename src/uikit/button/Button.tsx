import { ComponentProps, memo } from "react";
import clsx from "clsx";

type ButtonProps = ComponentProps<"button"> & {};

const Button = (props: ButtonProps) => {
  const { className, ...restButtonProps } = props;

  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 rounded-2xl bg-violet px-8 py-[18px] text-[20px] font-semibold text-white transition hover:bg-violetLight active:bg-violet disabled:cursor-not-allowed disabled:bg-violetSuperLight",
        className
      )}
      {...restButtonProps}
    />
  );
};

export default memo(Button);
