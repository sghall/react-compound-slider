// @flow weak
/* eslint-env mocha */

import React from 'react'
import { assert } from 'chai'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { linear } from '../Slider/scales'
import Ticks from './Ticks'

configure({ adapter: new Adapter() })

const noop = () => {}

describe('<Ticks />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Ticks scale={linear()} handles={[]} emitMouse={noop} emitTouch={noop}>
        {() => {
          return <div className="wu-tang" />
        }}
      </Ticks>,
    )

    assert.strictEqual(wrapper.contains(<div className="wu-tang" />), true)
  })
})
