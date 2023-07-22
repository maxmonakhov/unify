import { memo } from "react";
import clsx from "clsx";

export type Step = {
  name: string;
  // isActive: boolean;
};

type StepperProps = {
  steps: Step[];
  activeStepIndex: number;
};

const Stepper = (props: StepperProps) => {
  const { steps, activeStepIndex } = props;

  return (
    <div className="flex w-full items-center justify-between gap-2">
      {steps.map((step, index) => {
        const { name } = step;

        return (
          <>
            <div
              key={name}
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
          </>
        );
      })}
    </div>
  );
};

export default memo(Stepper);
