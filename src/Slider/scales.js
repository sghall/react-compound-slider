import { bisect, ticks } from 'd3-array'

export function discrete() {
  let x0 = 0
  let x1 = 1

  let domain = [0.5]
  let range = [0, 1]

  let n = 1

  function scale(x) {
    return range[bisect(domain, x, 0, n)]
  }

  function rescale() {
    let i = -1

    domain = new Array(n)

    while (++i < n) {
      domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1)
    }

    return scale
  }

  scale.domain = val => {
    if (!val) {
      return [x0, x1]
    }

    x0 = +val[0]
    x1 = +val[1]

    return rescale()
  }

  scale.range = val => {
    if (!val) {
      return range.slice()
    }

    range = val.slice()
    n = range.length - 1

    return rescale()
  }

  return scale
}

function interpolateValue(a, b) {
  return (
    (a = +a),
    (b -= a),
    function i(t) {
      return a + b * t
    }
  )
}

function deinterpolateValue(a, b) {
  return (b -= a = +a) ? x => (x - a) / b : () => b // eslint-disable-line
}

function initialize(domain, range) {
  let d0 = domain[0]
  const d1 = domain[1]

  let r0 = range[0]
  const r1 = range[1]

  if (d1 < d0) {
    d0 = deinterpolateValue(d1, d0)
    r0 = interpolateValue(r1, r0)
  } else {
    d0 = deinterpolateValue(d0, d1)
    r0 = interpolateValue(r0, r1)
  }

  return x => r0(d0(x))
}

const coerceNumeric = d => +d

export function linear() {
  let domain = [0, 1]
  let range = [0, 1]

  let output

  function rescale() {
    output = null
    return scale
  }

  function scale(x) {
    return (output || (output = initialize(domain, range)))(+x)
  }

  scale.domain = val => {
    if (!val) {
      return domain.slice()
    }

    domain = val.map(coerceNumeric)

    return rescale()
  }

  scale.range = val => {
    if (!val) {
      return range.slice()
    }

    range = val.map(coerceNumeric)

    return rescale()
  }

  scale.ticks = count => {
    const d = domain

    return ticks(d[0], d[d.length - 1], count ? 10 : count)
  }

  return rescale()
}
