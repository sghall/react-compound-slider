import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { Ticks } from './Ticks';

describe('<Ticks />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Ticks>
        {() => {
          return <div className="foo" />;
        }}
      </Ticks>
    );

    assert.strictEqual(wrapper.contains(<div className="foo" />), true);
  });
});
