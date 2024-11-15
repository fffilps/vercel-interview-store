'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ShippingFormProps {
  onNext: () => void
  onBack: () => void
}

export function ShippingForm({ onNext, onBack }: ShippingFormProps) {
  const [formData, setFormData] = useState({
    address: '',
    apartment: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    shippingMethod: 'standard'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add validation here
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Shipping Address</h2>
      
      <div className="space-y-4">
        <Input
          placeholder="Address"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        
        <Input
          placeholder="Apartment, suite, etc. (optional)"
          value={formData.apartment}
          onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="City"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <Input
            placeholder="State"
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
        </div>
        
        <Input
          placeholder="ZIP code"
          required
          value={formData.zipCode}
          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
        />

        <Select
          value={formData.shippingMethod}
          onValueChange={(value) => setFormData({ ...formData, shippingMethod: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select shipping method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard Shipping (5-7 days)</SelectItem>
            <SelectItem value="express">Express Shipping (2-3 days)</SelectItem>
            <SelectItem value="overnight">Overnight Shipping</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Continue to Payment
        </Button>
      </div>
    </form>
  )
} 