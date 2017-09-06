// @flow weak
/* eslint-env mocha */

import { assert } from 'chai'
import { mode1, mode2 } from './modes'

describe('modes', () => {
  describe('mode1', () => {
    it('should just return the next items', () => {
      const prev = []
      const next = []

      const result = mode1(prev, next)
      assert.strictEqual(result, next)
    })
  })

  describe('mode2', () => {
    it('should return prev if key order has changed', () => {
      const prev = [{ key: 'key-1', val: 100 }, { key: 'key-2', val: 200 }]
      const next = prev.slice().reverse()

      const result = mode2(prev, next)
      assert.strictEqual(result, prev)
    })

    it('should return prev if the change would result in two keys with same value', () => {
      const prev = [{ key: 'key-1', val: 100 }, { key: 'key-2', val: 200 }]
      const next = [{ key: 'key-1', val: 100 }, { key: 'key-2', val: 100 }]

      const result = mode2(prev, next)
      assert.strictEqual(result, prev)
    })
  })
})
