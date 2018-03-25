// @flow weak
/* eslint-env mocha */

import React from 'react'
import { assert } from 'chai'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { LinearScale } from '../Slider/utils'
import Tracks from './Tracks'

configure({ adapter: new Adapter() })

const noop = () => {}

describe('<Tracks />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Tracks
        scale={new LinearScale()}
        handles={[]}
        emitMouse={noop}
        emitTouch={noop}
      >
        {() => {
          return <div className="wu-tang" />
        }}
      </Tracks>,
    )

    assert.strictEqual(wrapper.contains(<div className="wu-tang" />), true)
  })
})
