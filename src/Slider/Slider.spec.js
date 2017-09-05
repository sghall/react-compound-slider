// @flow weak
/* eslint-env mocha */

import React from 'react'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import Slider from './Slider'

describe('<Slider />', () => {
  it('should render with no props or children', () => {
    const wrapper = shallow(<Slider />)

    assert.isOK(wrapper.is('g'))
  })
})
