import { bisect } from 'd3-array'

export function getSortByVal(reversed) {
  return function sortByVal(a, b) {
    if (a.val > b.val) {
      return reversed ? -1 : 1
    }

    if (b.val > a.val) {
      return reversed ? 1 : -1
    }

    return 0
  }
}

export function updateValues(values, active, nxt, reversed) {
  const index = values.findIndex(v => v.key === active)

  if (index !== -1) {
    const { key, val } = values[index]

    if (val !== nxt) {
      return [
        ...values.slice(0, index),
        { key, val: nxt },
        ...values.slice(index + 1),
      ].sort(getSortByVal(reversed))
    }
  }

  return values
}

export function getSliderDomain(slider, vertical) {
  if (!slider) {
    return [0, 0]
  }

  const s = slider.getBoundingClientRect()
  return vertical ? [s.top, s.bottom] : [s.left, s.right]
}

function precision(num) {
  const m = `${num}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)

  if (!m) {
    return 0
  }

  return Math.max(0, (m[1] ? m[1].length : 0) - (m[2] ? +m[2] : 0))
}

export function getStepRange(min, max, step) {
  const fixed = precision(step)

  const pMin = +min.toFixed(fixed)
  const pMax = +max.toFixed(fixed)

  const range = []

  let next = pMin

  while (next <= pMax) {
    range.push(next)
    next = +(next + step).toFixed(fixed)
  }

  return range
}

export function isNotValidTouch({ type, touches }) {
  return (
    !touches ||
    touches.length > 1 ||
    (type.toLowerCase() === 'touchend' && touches.length > 0)
  )
}

export function getTouchPosition(vertical, e) {
  return vertical ? e.touches[0].clientY : e.touches[0].pageX
}

export class DiscreteScale {
  constructor() {
    this.x0 = 0
    this.x1 = 1

    this.domain = [0.5]
    this.range = [0, 1]

    this.n = 1
  }

  getValue(x) {
    const { range, domain, n } = this
    return range[bisect(domain, x, 0, n)]
  }

  rescale() {
    const { x0, x1, n } = this

    let i = -1

    this.domain = new Array(n)

    while (++i < n) {
      this.domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1)
    }
  }

  setDomain = val => {
    this.x0 = +val[0]
    this.x1 = +val[1]
    this.rescale()

    return this
  }

  setRange = val => {
    this.range = val.slice()
    this.n = this.range.length - 1

    return this
  }
}
