import { assert } from 'chai';
import * as utils from './utils';

describe('utils', () => {
  describe('getUpdatedHandles', () => {
    it('should return the values array if no change', () => {
      const values = [
        { key: 'key-1', val: 100 },
        { key: 'key-2', val: 200 },
      ];

      const result = utils.getUpdatedHandles(values, 'key-1', 100, false);
      assert.strictEqual(result, values);
    });

    it('should return new array if there is a change', () => {
      const values = [
        { key: 'key-1', val: 100 },
        { key: 'key-2', val: 200 },
      ];

      const result = utils.getUpdatedHandles(values, 'key-1', 150, false);
      assert.notEqual(result, values);
    });
  });

  describe('getSortByVal', () => {
    it('should return a function', () => {
      const result = utils.getSortByVal();
      assert.isFunction(result);
    });

    it('should correctly sort an array of objects with a val prop', () => {
      const vals = [
        { key: 'a', val: 3 },
        { key: 'b', val: 5 },
        { key: 'c', val: 3 },
        { key: 'd', val: 2 },
      ];

      const result1 = vals.sort(utils.getSortByVal());
      assert.strictEqual(result1[result1.length - 1].key, 'b');

      const result2 = vals.sort(utils.getSortByVal(true));
      assert.strictEqual(result2[result2.length - 1].key, 'd');
    });
  });
});
