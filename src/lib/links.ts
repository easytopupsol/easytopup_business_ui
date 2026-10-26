// Public redirect destinations only. No authentication or recharge API lives in the landing page.
export const portalLinks = {
  customer: process.env.NEXT_PUBLIC_CUSTOMER_URL ?? 'https://easytopup.shop/customer',
  agent: process.env.NEXT_PUBLIC_AGENT_URL ?? 'https://easytopup.shop/agent',
  dealer: process.env.NEXT_PUBLIC_DEALER_URL ?? 'https://easytopup.shop/dealer',
};
export const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '6597835517';
export function enquiryLink(country: string) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello EasyTopup, I would like to check recharge availability for ${country}.`)}`;
}
