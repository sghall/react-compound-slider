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
      const prev1 = [{ key: 'key-1', val: 100 }, { key: 'key-2', val: 200 }]
      const next1 = [{ key: 'key-1', val: 100 }, { key: 'key-2', val: 100 }]

      assert.strictEqual(mode2(prev1, next1), prev1)

      const prev2 = [
        { key: 'key-1', val: 100 },
        { key: 'key-2', val: 200 },
        { key: 'key-3', val: 300 },
      ]
      const next2 = [
        { key: 'key-1', val: 100 },
        { key: 'key-2', val: 100 },
        { key: 'key-3', val: 300 },
      ]

      assert.strictEqual(mode2(prev2, next2), prev2)
    })

    it('should return next if values are different and they would NOT change order', () => {
      const prev1 = [{ key: 'key-1', val: 100 }, { key: 'key-2', val: 200 }]
      const next1 = [{ key: 'key-1', val: 100 }, { key: 'key-2', val: 300 }]

      assert.strictEqual(mode2(prev1, next1), next1)
    })
  })
})
