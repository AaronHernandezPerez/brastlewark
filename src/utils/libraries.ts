export function getPageElements(
  page: number,
  perPage: number,
  maxCollection: number
) {
  const numEl = page * perPage;

  if (numEl > maxCollection) {
    return maxCollection - 1;
  }
  return numEl;
}
