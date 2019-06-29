// @flow weak
/* eslint-env mocha */

/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import { assert } from 'chai'
import Slider, { mode1, mode2, mode3 } from './index'

describe('react-compound-slider', () => {
  it('should have default export', () => assert.ok(Slider))
  it('should export mode1', () => {
    assert.ok(mode1)
    assert.typeOf(mode1, 'function')
  })
  it('should export mode2', () => {
    assert.ok(mode2)
    assert.typeOf(mode2, 'function')
  })
  it('should export mode3', () => {
    assert.ok(mode3)
    assert.typeOf(mode3, 'function')
  })
})
