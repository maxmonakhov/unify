import { Fragment, memo } from "react";
import clsx from "clsx";

export type Step = {
  name: string;
  // isActive: boolean;
};

type StepperProps = {
  steps: Step[];
  activeStepIndex: number;
  className?: string;
};

const Stepper = (props: StepperProps) => {
  const { steps, activeStepIndex, className } = props;

  return (
    <div className={clsx("flex w-full items-center justify-between gap-2", className)}>
      {steps.map((step, index) => {
        const { name } = step;

        return (
          <Fragment key={name}>
            <div
              className={clsx("relative h-4 w-4 rounded-full border border-solid ", {
                "border-violet": index <= activeStepIndex,
                "bg-violet": index < activeStepIndex
              })}
            >
              <span
                className={clsx("absolute -top-[52px] -translate-x-1/2 whitespace-nowrap", {
                  "text-violet": index === activeStepIndex || index === steps.length - 1
                })}
              >
                {name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={clsx("solid flex-1 border-t-[1px]", {
                  "border-violet": index < activeStepIndex
                })}
              ></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default memo(Stepper);
