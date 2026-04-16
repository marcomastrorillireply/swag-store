import { fetchActivePromotion } from '@/lib/promotions'

import PromotionStripClient from './promotion-strip-client'

export default async function PromotionStrip() {
  const promotion = await fetchActivePromotion()

  if (!promotion?.active) {
    return null
  }

  return <PromotionStripClient promotion={promotion} />
}
