export const WEBINAR_COUPON_CODE = 'EH2026Q3'
export const WEBINAR_COUPON_DISCOUNT_USD = 30
export const WEBINAR_COUPON_COURSE_SLUG = 'ai-hands-on-deck'

// Informational voucher value shown on a webinar registration's invoice (admin bookkeeping only —
// does not change the actual $30 discount applied on the AI Hands-On Deck enrollment form above).
export const WEBINAR_BASE_VOUCHER_USD = 70
export const WEBINAR_AFFILIATE_BONUS_USD = 30

export function webinarVoucherValue(referralSource: string | null): number {
  const isAffiliate = (referralSource ?? '').trim().toUpperCase() === WEBINAR_COUPON_CODE
  return WEBINAR_BASE_VOUCHER_USD + (isAffiliate ? WEBINAR_AFFILIATE_BONUS_USD : 0)
}
