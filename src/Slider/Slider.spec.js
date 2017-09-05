// @flow weak
/* eslint-env mocha */

import React from 'react'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import Slider from './Slider'

describe('<Slider />', () => {
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <Slider>
        <div className="unique" />
      </Slider>,
    )

    assert.strictEqual(wrapper.contains(<div className="unique" />), true)
  })
})
