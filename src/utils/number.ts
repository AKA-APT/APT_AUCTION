export function commaizeNumber(num: number) {
  const integerPart = Math.floor(num);
  return integerPart.toLocaleString();
}
