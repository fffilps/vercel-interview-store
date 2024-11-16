'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useCallback, useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import debounce from 'lodash/debounce'

export function SearchForm({ initialSearch = '' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState(initialSearch)

  // Debounced function to update URL
  const debouncedUpdateUrl = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      startTransition(() => {
        router.push(`/products?${params.toString()}`)
      })
    }, 300),
    [searchParams, router]
  )

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedUpdateUrl(value)
  }

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedUpdateUrl.cancel()
    }
  }, [debouncedUpdateUrl])

  return (
    <div className="relative">
      <div className="relative">
        <Input
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search products..."
          className="pl-10 max-w-sm"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  )
} 