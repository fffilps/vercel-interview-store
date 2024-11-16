import { create } from 'zustand'

/**
 * Represents the data collected during the checkout process
 * @interface CheckoutFormData
 */
interface CheckoutFormData {
  // Information step
  email: string
  firstName: string
  lastName: string
  
  // Shipping step
  address: string
  apartment?: string
  city: string
  country: string
  state: string
  zipCode: string
  
  // Payment step
  cardNumber?: string
  cardExpiry?: string
  cardCvc?: string
}

/**
 * Checkout store state and actions
 * @interface CheckoutStore
 */
interface CheckoutStore {
  formData: CheckoutFormData
  currentStep: number
  updateFormData: (data: Partial<CheckoutFormData>) => void
  setStep: (step: number) => void
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
  currentStep: 1,
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setStep: (step) => set({ currentStep: step }),
})) 