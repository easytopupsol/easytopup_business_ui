// The business landing site intentionally has no Agent, Dealer or Customer portal redirects.
export const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '6597835517';

export function enquiryLink(country: string) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello EasyTopup, I would like to check recharge availability for ${country}.`)}`;
}
