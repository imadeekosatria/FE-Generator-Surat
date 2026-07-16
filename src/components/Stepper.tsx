import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

export function Stepper({ currentStep }: StepperProps) {
  const steps = [
    { label: "Data Dinas Dukcapil", description: "Pihak Pertama" },
    { label: "Data OPD", description: "Pihak Kedua" },
    { label: "Data PKS", description: "Detail Kerjasama" },
  ];

  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto relative mt-8 mb-6">
      <div className="absolute top-4 left-[16.66%] right-[16.66%] h-[2px] bg-outline-variant z-0"></div>
      <div
        className="absolute top-4 left-[16.66%] h-[2px] bg-primary z-0 transition-all duration-300"
        style={{ width: `${(currentStep - 1) * 33.33}%` }}
      ></div>

      <div className="flex justify-between w-full relative z-10">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={index} className="flex flex-col items-center flex-1 gap-2 relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all ${
                  isCompleted
                    ? "bg-primary text-on-primary shadow-sm"
                    : isActive
                      ? "bg-primary text-on-primary ring-4 ring-primary-fixed shadow-sm"
                      : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {isCompleted ? <Check size={16} strokeWidth={3} /> : <span className="font-bold text-sm">{stepNumber}</span>}
              </div>
              <span
                className={`font-label-md text-label-md mt-1 ${
                  isActive || isCompleted ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
