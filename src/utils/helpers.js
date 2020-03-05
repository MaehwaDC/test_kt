
export function generateArr (count, mapFunc) {
  return Array.from(new Array(count), mapFunc);
}

export function random(min = 0, max = Number.MAX_SAFE_INTEGER) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
}
