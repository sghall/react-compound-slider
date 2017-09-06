export const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))
