'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { Button } from '@/components/ui/button'
import { Steps } from '@/components/checkout/steps'
import { InformationForm } from '@/components/checkout/information-form'
import { ShippingForm } from '@/components/checkout/shipping-form'
import { PaymentForm } from '@/components/checkout/payment-form'
import { OrderSummary } from '@/components/checkout/order-summary'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { items, totalItems, clearCart } = useCartStore()

  if (totalItems === 0) {
    router.push('/products')
    return null
  }

  const handleComplete = () => {
    clearCart()
    router.push('/checkout/success')
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Flow */}
        <div className="lg:col-span-2 space-y-8">
          <Steps currentStep={step} />
          
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {step === 1 && (
              <InformationForm onNext={() => setStep(2)} />
            )}
            
            {step === 2 && (
              <ShippingForm 
                onNext={() => setStep(3)} 
                onBack={() => setStep(1)}
              />
            )}
            
            {step === 3 && (
              <PaymentForm 
                onComplete={handleComplete}
                onBack={() => setStep(2)}
              />
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  )
} 