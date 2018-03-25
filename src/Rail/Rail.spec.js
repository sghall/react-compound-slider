// @flow weak
/* eslint-env mocha */

import React from 'react'
import { assert } from 'chai'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Rail from './Rail'

configure({ adapter: new Adapter() })

const noop = () => {}

describe('<Rail />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Rail emitMouse={noop} emitTouch={noop}>
        {() => {
          return <div className="wu-tang" />
        }}
      </Rail>,
    )

    assert.strictEqual(wrapper.contains(<div className="wu-tang" />), true)
  })
})
