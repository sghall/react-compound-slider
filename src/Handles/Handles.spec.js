// @flow weak
/* eslint-env mocha */

import React from 'react'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import Handles from './Handles'

const noop = () => {}

describe('<Handles />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Handles handles={[]} emitMouse={noop} emitTouch={noop}>
        {() => {
          return <div className="wu-tang" />
        }}
      </Handles>,
    )

    assert.strictEqual(wrapper.contains(<div className="wu-tang" />), true)
  })
})
