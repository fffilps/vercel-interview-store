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

interface PaymentFormProps {
  onComplete: () => void
  onBack: () => void
}

export function PaymentForm({ onComplete, onBack }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    paymentMethod: 'credit'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add validation here
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Payment Details</h2>
      
      <div className="space-y-4">
        <Select
          value={formData.paymentMethod}
          onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="credit">Credit Card</SelectItem>
            <SelectItem value="debit">Debit Card</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Card number"
          required
          value={formData.cardNumber}
          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="MM/YY"
            required
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          />
          <Input
            placeholder="CVV"
            required
            type="password"
            maxLength={4}
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
          />
        </div>
        
        <Input
          placeholder="Name on card"
          required
          value={formData.cardName}
          onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Complete Order
        </Button>
      </div>
    </form>
  )
} 