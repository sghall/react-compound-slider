// @flow weak
/* eslint-env mocha */

import { assert } from 'chai'
import { mode1 } from './modes'

describe('mode1', () => {
  it('should just return the next items', () => {
    const prev = []
    const next = []

    const result = mode1(prev, next)
    assert.strictEqual(result, next)
  })
})
