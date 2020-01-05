import { assert } from 'chai';
import { DiscreteScale } from './DiscreteScale';

const getTestValues = (min = 0, max = 10) => {
  return {
    range: [min, max],
    domain: [min, max],
  };
};

describe('DiscreteScale', () => {
  let scale: DiscreteScale;

  beforeEach(() => {
    scale = new DiscreteScale();
  });

  it('should return correct values', () => {
    const { range, domain } = getTestValues();
    scale.setRange(range).setDomain(domain);
    assert.strictEqual(scale.getValue(5.4), 5);
    assert.strictEqual(scale.getValue(0.4), 0);
    assert.strictEqual(scale.getValue(5.5), 6);
  });
});
