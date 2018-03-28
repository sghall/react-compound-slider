import { bisect } from 'd3-array'

export default class DiscreteScale {
  constructor() {
    this.x0 = 0
    this.x1 = 1

    this.domain = [0.5]
    this.range = [0, 1]

    this.n = 1
  }

  getValue = x => {
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
