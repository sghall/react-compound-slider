import { bisect, ticks } from 'd3-array'

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

export class LinearScale {
  constructor() {
    this.domain = [0, 1]
    this.range = [0, 1]
    this.interpolator = null
  }

  createInterpolator(domain, range) {
    let d0 = domain[0]
    const d1 = domain[1]

    let r0 = range[0]
    const r1 = range[1]

    if (d1 < d0) {
      d0 = this.deinterpolateValue(d1, d0)
      r0 = this.interpolateValue(r1, r0)
    } else {
      d0 = this.deinterpolateValue(d0, d1)
      r0 = this.interpolateValue(r0, r1)
    }

    return x => r0(d0(x))
  }

  interpolateValue(a, b) {
    return (
      (a = +a),
      (b -= a),
      function i(t) {
        return a + b * t
      }
    )
  }

  deinterpolateValue(a, b) {
    return (b -= a = +a) ? x => (x - a) / b : () => b // eslint-disable-line
  }

  rescale() {
    this.interpolator = null
    return this
  }

  getValue(x) {
    const { domain, range } = this
    return (this.interpolator ||
      (this.interpolator = this.createInterpolator(domain, range)))(+x)
  }

  setDomain(val) {
    this.domain = val.map(d => +d)
    this.rescale()

    return this
  }

  getDomain() {
    return this.domain
  }

  setRange(val) {
    this.range = val.map(d => +d)

    return this
  }

  getTicks(count) {
    const d = this.domain

    return ticks(d[0], d[d.length - 1], count ? 10 : count)
  }
}
