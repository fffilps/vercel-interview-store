import { create } from 'zustand'

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  country: string
  state: string
  zipCode: string
}

interface CheckoutStore {
  formData: CheckoutFormData
  updateFormData: (data: Partial<CheckoutFormData>) => void
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  formData: {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
  },
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
})) 