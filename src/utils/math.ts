export function round(num: number, decimals = 2) {
  // @ts-ignore
  return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
}
