'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCheckoutStore } from "@/lib/store/checkout"

export function PaymentForm() {
  const { formData, updateFormData, setStep } = useCheckoutStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment processing here
    console.log('Processing payment with form data:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        name="cardNumber"
        placeholder="Card number"
        required
        value={formData.cardNumber}
        onChange={(e) => updateFormData({ cardNumber: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="cardExpiry"
          placeholder="MM/YY"
          required
          value={formData.cardExpiry}
          onChange={(e) => updateFormData({ cardExpiry: e.target.value })}
        />
        <Input
          name="cardCvc"
          placeholder="CVC"
          required
          value={formData.cardCvc}
          onChange={(e) => updateFormData({ cardCvc: e.target.value })}
        />
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(2)}
          className="w-full"
        >
          Back
        </Button>
        <Button 
          type="submit"
          className="w-full border border-primary hover:bg-primary/90"
        >
          Pay now
        </Button>
      </div>
    </form>
  )
} 