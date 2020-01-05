import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { Handles } from './Handles';

const noop = () => {};

describe('<Handles />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Handles handles={[]} emitMouse={noop} emitTouch={noop}>
        {() => {
          return <div className="foo" />;
        }}
      </Handles>
    );

    assert.strictEqual(wrapper.contains(<div className="foo" />), true);
  });
});
