'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCheckoutStore } from "@/lib/store/checkout"

export function ShippingForm() {
  const { formData, updateFormData, setStep } = useCheckoutStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3) // Move to payment step
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        name="address"
        placeholder="Address"
        required
        value={formData.address}
        onChange={(e) => updateFormData({ address: e.target.value })}
      />
      <Input
        name="apartment"
        placeholder="Apartment, suite, etc. (optional)"
        value={formData.apartment}
        onChange={(e) => updateFormData({ apartment: e.target.value })}
      />
      <div className="grid grid-cols-3 gap-4">
        <Input
          name="city"
          placeholder="City"
          required
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
        />
        <Input
          name="state"
          placeholder="State"
          required
          value={formData.state}
          onChange={(e) => updateFormData({ state: e.target.value })}
        />
        <Input
          name="zipCode"
          placeholder="ZIP code"
          required
          value={formData.zipCode}
          onChange={(e) => updateFormData({ zipCode: e.target.value })}
        />
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
          className="w-full"
        >
          Back
        </Button>
        <Button 
          type="submit"
          className="w-full border border-primary hover:bg-primary/90"
        >
          Continue to payment
        </Button>
      </div>
    </form>
  )
} 