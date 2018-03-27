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
})
