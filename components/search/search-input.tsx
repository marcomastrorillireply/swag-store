'use client'

import { useState, useRef, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Search } from 'lucide-react'

export function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(searchParams.get('query') ?? '')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function pushQuery(query: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set('query', query)
    } else {
      params.delete('query')
    }
    startTransition(() => router.push(`/search?${params.toString()}`))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setValue(newValue)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (newValue.length >= 3) {
      debounceRef.current = setTimeout(() => pushQuery(newValue), 400)
    } else if (newValue.length === 0) {
      pushQuery('')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      pushQuery(value)
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="w-64"
      />
      <Button
        variant="outline"
        size="icon-lg"
        disabled={isPending}
        onClick={() => {
          if (debounceRef.current) clearTimeout(debounceRef.current)
          pushQuery(value)
        }}
      >
        {isPending ? <Spinner className="size-4" /> : <Search className="size-4" />}
      </Button>
    </div>
  )
}
