import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '@/lib/sanity/queries'

interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      addItem: (product) => {
        const currentState = get()
        const existingItem = currentState.items.find(item => item._id === product._id)

        if (existingItem) {
          const updatedItems = currentState.items.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
          set({
            items: updatedItems,
            totalItems: currentState.totalItems + 1
          })
        } else {
          set({
            items: [...currentState.items, { ...product, quantity: 1 }],
            totalItems: currentState.totalItems + 1
          })
        }
      },
      removeItem: (productId) => {
        const currentState = get()
        const item = currentState.items.find(item => item._id === productId)
        if (!item) return

        set({
          items: currentState.items.filter(item => item._id !== productId),
          totalItems: currentState.totalItems - item.quantity
        })
      },
      updateQuantity: (productId, quantity) => {
        const currentState = get()
        const oldItem = currentState.items.find(item => item._id === productId)
        if (!oldItem) return

        const difference = quantity - oldItem.quantity
        const updatedItems = currentState.items.map(item =>
          item._id === productId
            ? { ...item, quantity }
            : item
        )

        set({
          items: updatedItems,
          totalItems: currentState.totalItems + difference
        })
      },
      clearCart: () => set({ items: [], totalItems: 0 }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false })
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      // Only store specific parts of the state
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems
      }),
      // Version the storage to handle migrations
      version: 1,
      // Merge strategy for hydration
      merge: (persistedState: any, currentState) => {
        return {
          ...currentState,
          ...persistedState,
          // Ensure we don't persist the open state
          isOpen: false
        }
      }
    }
  )
) 