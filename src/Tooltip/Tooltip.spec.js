// @flow weak
/* eslint-env mocha */

import React from 'react'
import { assert } from 'chai'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Tooltip from './Tooltip'

configure({ adapter: new Adapter() })

const noop = () => {}

describe('<Tooltip />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Tooltip tooltipInfo={{ percent: 0, handleId: 'oh', grabbed: false }}>
        {() => {
          return <div className="wu-tang" />
        }}
      </Tooltip>,
    )

    assert.strictEqual(wrapper.contains(<div className="wu-tang" />), true)
  })
})
