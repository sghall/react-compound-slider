function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export class DiscreteScale {
  step: number = 1;
  domain: number[] = [0, 1];
  range: number[] = [0, 1];

  setDomain = (val: number[]) => {
    this.domain = [val[0], val[1]];

    return this;
  };

  setRange = (val: number[]) => {
    this.range = [val[0], val[1]];

    return this;
  };

  setStep = (val: number) => {
    this.step = val;

    return this;
  };

  getValue = (x: number) => {
    const {
      domain: [d0, d1],
      range: [r0, r1],
      step,
    } = this;

    const p = (clamp(x, d0, d1) - d0) / (d1 - d0);
    const b = step * Math.round((p * (r1 - r0)) / step) + r0;

    return clamp(b, r0 < r1 ? r0 : r1, r1 > r0 ? r1 : r0);
  };
}
