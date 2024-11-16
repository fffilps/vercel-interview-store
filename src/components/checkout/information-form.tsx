'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCheckoutStore } from "@/lib/store/checkout"

export function InformationForm() {
  const { formData, updateFormData, setStep } = useCheckoutStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2) // Move to shipping step
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        name="email"
        placeholder="Email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="firstName"
          placeholder="First name"
          required
          value={formData.firstName}
          onChange={(e) => updateFormData({ firstName: e.target.value })}
        />
        <Input
          name="lastName"
          placeholder="Last name"
          required
          value={formData.lastName}
          onChange={(e) => updateFormData({ lastName: e.target.value })}
        />
      </div>
      <Button 
        type="submit"
        className="w-full border border-primary hover:bg-primary/90"
      >
        Continue to shipping
      </Button>
    </form>
  )
} 