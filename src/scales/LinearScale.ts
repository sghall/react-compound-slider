import { ticks } from 'd3-array';

import { Interpolator } from '../types';

export class LinearScale {
  interpolator: Interpolator | null;
  domain: number[] = [0, 1];
  range: number[] = [0, 1];

  constructor() {
    this.domain = [0, 1];
    this.range = [0, 1];
    this.interpolator = null;
  }

  createInterpolator(domain: number[], range: number[]) {
    const d0 = domain[0];
    const d1 = domain[1];

    const r0 = range[0];
    const r1 = range[1];

    if (d1 < d0) {
      return (x: number) =>
        this.interpolateValue(r1, r0)(this.deinterpolateValue(d1, d0)(x));
    } else {
      return (x: number) =>
        this.interpolateValue(r0, r1)(this.deinterpolateValue(d0, d1)(x));
    }
  }

  interpolateValue(a: number, b: number) {
    return (
      (a = +a),
      (b -= a),
      function i(t: number) {
        return a + b * t;
      }
    );
  }

  deinterpolateValue(a: number, b: number) {
    return (b -= a = +a) ? (x: number) => (x - a) / b : () => b;
  }

  rescale() {
    this.interpolator = null;

    return this;
  }

  getValue(x: number) {
    const { domain, range } = this;

    return (
      this.interpolator ||
      (this.interpolator = this.createInterpolator(domain, range))
    )(+x);
  }

  setDomain(val: number[]) {
    this.domain = [val[0], val[1]];

    this.rescale();

    return this;
  }

  getDomain() {
    return this.domain;
  }

  setRange(val: number[]) {
    this.range = [val[0], val[1]];

    return this;
  }

  getRange() {
    return this.range;
  }

  getTicks(count: number) {
    const d = this.domain;
    return ticks(d[0], d[d.length - 1], count ? count : 10);
  }
}
