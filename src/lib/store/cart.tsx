'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { Product } from '@/lib/sanity/queries'

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'HYDRATE'; payload: CartState }

interface CartContextType extends CartState {
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item._id === action.payload._id)
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: state.totalItems + 1
        }
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        totalItems: state.totalItems + 1
      }
    }

    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item._id === action.payload)
      if (!item) return state

      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        totalItems: state.totalItems - item.quantity
      }
    }

    case 'UPDATE_QUANTITY': {
      const oldItem = state.items.find(item => item._id === action.payload.productId)
      if (!oldItem) return state

      const difference = action.payload.quantity - oldItem.quantity
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalItems: state.totalItems + difference
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      }

    case 'HYDRATE':
      return {
        ...state,
        ...action.payload,
        isOpen: false
      }

    default:
      return state
  }
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart-storage')
    if (stored) {
      const data = JSON.parse(stored)
      dispatch({ type: 'HYDRATE', payload: data })
    }
  }, [])

  // Persist state changes to localStorage
  useEffect(() => {
    const data = {
      items: state.items,
      totalItems: state.totalItems
    }
    localStorage.setItem('cart-storage', JSON.stringify(data))
  }, [state.items, state.totalItems])

  const contextValue: CartContextType = {
    ...state,
    addItem: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
    removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', payload: productId }),
    updateQuantity: (productId, quantity) => 
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' })
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 