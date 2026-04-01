const POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/;

export function isValidPostcode(input: string): boolean {
  const cleaned = input.replace(/\s+/g, '').toUpperCase();
  return POSTCODE_REGEX.test(cleaned);
}