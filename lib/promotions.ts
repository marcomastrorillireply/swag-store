'use cache'

import { cacheLife } from 'next/cache'

import type { Promotion } from '@/types'

import { fetchVercelApi } from './fetchVercelApi'

export const fetchActivePromotion = async (): Promise<Promotion | null> => {
  cacheLife('seconds')

  try {
    const response = await fetchVercelApi('/promotions')
    const { data } = await response.json()
    console.log('promotion data', data)
    return data as Promotion
  } catch {
    return null
  }
}
