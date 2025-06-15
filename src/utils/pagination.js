export function getArrayOfPages(num) {
  return Array.from({ length: num }, (_, i) => i + 1);
}
