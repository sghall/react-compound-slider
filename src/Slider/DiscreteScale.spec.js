// @flow weak
/* eslint-env mocha */

import { assert } from 'chai'
import DiscreteScale from './DiscreteScale'
import { getStepRange } from './utils'

const getTestValues = (min = 0, max = 10, step = 1) => {
  return {
    range: getStepRange(min, max, step),
    domain: [min - step / 2, max + step / 2],
  }
}

describe('DiscreteScale', () => {
  let scale

  beforeEach(() => {
    scale = new DiscreteScale()
  })

  it('should return correct values', () => {
    const { range, domain } = getTestValues()
    scale.setRange(range).setDomain(domain)
    assert.strictEqual(scale.getValue(5.4), 5)
    assert.strictEqual(scale.getValue(0.4), 0)
    assert.strictEqual(scale.getValue(5.5), 6)
  })
})
