/**
 * Delivery scheduling rules for Florence Flowers.
 * The shop is open and delivers Sunday to Friday only.
 */

export function isSaturday(date: Date): boolean {
  return date.getDay() === 6;
}

/** Saturdays are excluded from delivery: the shop is closed that day. */
export function isBlockedDeliveryDate(date: Date): boolean {
  return isSaturday(date);
}

export function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
