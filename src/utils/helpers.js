
export function generateArr (count, mapFunc) {
  return Array.from(new Array(count), mapFunc);
}

export function random(min = 0, max = Number.MAX_SAFE_INTEGER) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

export function sortTasksByDate(tasks) {
  return tasks.sort((a, b) => {
    if (a.date < Date.now()) return -1;
    else if (b.date < Date.now()) return 1;
    return 0
  })
}
