'use client'

import { Steps } from "@/components/checkout/steps"
import { InformationForm } from "@/components/checkout/information-form"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { useCheckoutStore } from "@/lib/store/checkout"

export default function CheckoutPage() {
  const { currentStep } = useCheckoutStore()

  return (
    <div className="container mx-auto px-4 py-8">
      <Steps currentStep={currentStep} />
      <div className="mt-8">
        {currentStep === 1 && <InformationForm />}
        {currentStep === 2 && <ShippingForm />}
        {currentStep === 3 && <PaymentForm />}
      </div>
    </div>
  )
} 