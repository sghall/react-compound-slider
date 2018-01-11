// @flow weak
/* eslint-env mocha */

import React from 'react'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import { linear } from '../Slider/scales'
import Tracks from './Tracks'

const noop = () => {}

describe('<Tracks />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Tracks scale={linear()} handles={[]} emitMouse={noop} emitTouch={noop}>
        {() => {
          return <div className="wu-tang" />
        }}
      </Tracks>,
    )

    assert.strictEqual(wrapper.contains(<div className="wu-tang" />), true)
  })
})
