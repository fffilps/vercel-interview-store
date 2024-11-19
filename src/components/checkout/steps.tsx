

interface StepsProps {
  currentStep: number
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    { number: 1, title: 'Information' },
    { number: 2, title: 'Shipping' },
    { number: 3, title: 'Payment' },
  ]

  return (
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`
            flex items-center justify-center w-8 h-8 rounded-full 
            ${currentStep >= step.number 
              ? 'bg-green-500 text-primary-foreground' 
              : 'bg-gray-200 text-gray-600'}
          `}>
            {step.number}
          </div>
          <span className="ml-2 text-sm font-medium hidden sm:inline">
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className="w-12 sm:w-24 h-1 mx-2 bg-gray-200">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ 
                  width: currentStep > step.number ? '100%' : '0%' 
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 