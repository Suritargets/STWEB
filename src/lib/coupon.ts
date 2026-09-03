export const WEBINAR_COUPON_CODE = 'EH2026Q3'
export const WEBINAR_COUPON_DISCOUNT_USD = 30
export const WEBINAR_COUPON_COURSE_SLUG = 'ai-hands-on-deck'

// Informational voucher value shown on a webinar registration's invoice (admin bookkeeping only —
// does not change the actual $30 discount applied on the AI Hands-On Deck enrollment form above).
export const WEBINAR_BASE_VOUCHER_USD = 70
export const WEBINAR_AFFILIATE_BONUS_USD = 30

// Affiliate/referral codes — each is a valid $30 discount code on the AI Hands-On Deck enrollment
// form (same as WEBINAR_COUPON_CODE) and, when it shows up as a webinar registration's referral
// source, marks that signup as affiliate-driven for the informational voucher value above.
export type AffiliateCode = { code: string; owner: string }

export const AFFILIATE_CODES: AffiliateCode[] = [
  { code: 'EH2026Q3', owner: 'EH' },
  { code: 'RP2026Q3', owner: 'RP' },
]

export function findAffiliateCode(input: string | null | undefined): AffiliateCode | null {
  const normalized = (input ?? '').trim().toUpperCase()
  return AFFILIATE_CODES.find(a => a.code === normalized) ?? null
}

export function isKnownDiscountCode(input: string | null | undefined): boolean {
  return findAffiliateCode(input) !== null
}

export function webinarVoucherValue(referralSource: string | null): number {
  const isAffiliate = isKnownDiscountCode(referralSource)
  return WEBINAR_BASE_VOUCHER_USD + (isAffiliate ? WEBINAR_AFFILIATE_BONUS_USD : 0)
}
