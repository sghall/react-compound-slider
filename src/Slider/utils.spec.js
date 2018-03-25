// @flow weak
/* eslint-env mocha */

import { assert } from 'chai'
import * as utils from './utils'

describe('utils', () => {
  describe('updateValues', () => {
    it('should return the values array if no change', () => {
      const values = [{ key: 'key-1', val: 100 }, { key: 'key-2', val: 200 }]

      const result = utils.updateValues(values, 'key-1', 100, false)
      assert.strictEqual(result, values)
    })

    it('should return new array if there is a change', () => {
      const values = [{ key: 'key-1', val: 100 }, { key: 'key-2', val: 200 }]

      const result = utils.updateValues(values, 'key-1', 150, false)
      assert.notEqual(result, values)
    })
  })
  describe('LinearScale', () => {
    it('should return correct values', () => {
      const scale = new utils.LinearScale()
      scale.setDomain([0, 100]).setRange([0, 1])

      assert.strictEqual(scale.getValue(50), 0.5)
    })
    it('should handle reversed domains', () => {
      const scale = new utils.LinearScale()
      scale.setDomain([100, 0]).setRange([0, 1])

      assert.strictEqual(scale.getValue(50), 0.5)
    })
    it('should return the correct number of ticks', () => {
      const scale = new utils.LinearScale()
      scale.setDomain([0, 1000]).setRange([0, 100])

      assert.strictEqual(scale.getTicks(3).length, 3)
    })
  })
})
