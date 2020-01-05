import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { Rail } from './Rail';

const noop = () => {};

describe('<Rail />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Rail emitMouse={noop} emitTouch={noop}>
        {() => {
          return <div className="foo" />;
        }}
      </Rail>
    );

    assert.strictEqual(wrapper.contains(<div className="foo" />), true);
  });
});
