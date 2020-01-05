import { assert } from 'chai';
import {
  Slider,
  Rail,
  Handles,
  Ticks,
  Tracks,
  mode1,
  mode2,
  mode3,
} from './index';

describe('react-compound-slider', () => {
  it('Slider should be exported', () => assert.ok(Slider));
  it('Rail should be exported', () => assert.ok(Rail));
  it('Handles should be exported', () => assert.ok(Handles));
  it('Ticks should be exported', () => assert.ok(Ticks));
  it('Tracks should be exported', () => assert.ok(Tracks));
  it('should export mode1', () => {
    assert.ok(mode1);
    assert.typeOf(mode1, 'function');
  });
  it('should export mode2', () => {
    assert.ok(mode2);
    assert.typeOf(mode2, 'function');
  });
  it('should export mode3', () => {
    assert.ok(mode3);
    assert.typeOf(mode3, 'function');
  });
});
