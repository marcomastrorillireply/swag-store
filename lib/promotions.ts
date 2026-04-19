'use cache'

import { cacheLife, cacheTag } from 'next/cache'

import type { Promotion } from '@/types'

import { fetchVercelApi } from './fetchVercelApi'

export const fetchActivePromotion = async (): Promise<Promotion | null> => {
  cacheLife('hours')
  cacheTag('promotions')

  try {
    const response = await fetchVercelApi('/promotions')
    const { data } = await response.json()
    return data as Promotion
  } catch {
    return null
  }
}
