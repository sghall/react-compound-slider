function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

class DiscreteScale {
  constructor() {
    this.step = 1
    this.domain = [0, 1]
    this.range = [0, 1]
  }

  setDomain = val => {
    this.domain = val.slice()
    return this
  }

  setRange = val => {
    this.range = val.slice()
    return this
  }

  setStep = val => {
    this.step = val
    return this
  }

  getValue = x => {
    const {
      domain: [d0, d1],
      range: [r0, r1],
      step,
    } = this
    const p = (clamp(x, d0, d1) - d0) / (d1 - d0)
    const b = step * Math.round((p * (r1 - r0)) / step) + r0

    return clamp(b, r0 < r1 ? r0 : r1, r1 > r0 ? r1 : r0)
  }
}

export default DiscreteScale
