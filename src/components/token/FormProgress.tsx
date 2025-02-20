interface FormProgressProps {
  currentStep: number;
  steps: { title: string; number: number }[];
}

const FormProgress = ({ currentStep, steps }: FormProgressProps) => {
  return (
    <div className="flex items-center justify-center space-x-8 mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`
            flex items-center justify-center w-8 h-8 rounded-full
            ${currentStep >= step.number 
              ? 'bg-emerald-500 text-white' 
              : 'bg-gray-700 text-gray-400'}
          `}>
            {step.number}
          </div>
          <span className={`ml-2 ${
            currentStep >= step.number ? 'text-white' : 'text-gray-400'
          }`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-24 h-0.5 ml-4 ${
              currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormProgress;
