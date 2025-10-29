export function normalizePhoneNumber(
  raw: string,
  defaultCountry = '+60',
): string {
  if (!raw) return '';
  let phone = raw.trim().replace(/[\s-()]/g, '');
  if (!phone.startsWith('+')) {
    if (phone.startsWith('0')) phone = phone.substring(1);
    phone = defaultCountry + phone;
  }
  return phone;
}
