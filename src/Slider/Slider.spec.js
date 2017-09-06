// @flow weak
/* eslint-env mocha */

import React from 'react'
import sinon from 'sinon'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import Slider from './Slider'

describe('<Slider />', () => {
  let spy

  beforeEach(() => {
    spy = sinon.spy(Slider.prototype, 'updateRange')
  })

  afterEach(() => {
    spy.restore()
  })

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <Slider reversed step={10} domain={[100, 200]}>
        <div className="unique" />
      </Slider>,
    )

    assert.strictEqual(wrapper.contains(<div className="unique" />), true)
  })

  it('does NOT call updateRange when reversed, domain and step are unchanged', () => {
    const wrapper = shallow(
      <Slider reversed={false} step={10} domain={[100, 200]} />,
    )

    assert.strictEqual(spy.callCount, 1)
    wrapper.setProps({ reversed: false, step: 10, domain: [100, 200] })
    assert.strictEqual(spy.callCount, 1)
  })

  it('calls updateRange when domain changes', () => {
    const wrapper = shallow(
      <Slider reversed={false} step={10} domain={[100, 200]} />,
    )

    assert.strictEqual(spy.callCount, 1)
    wrapper.setProps({ reversed: true, step: 10, domain: [100, 200] })
    assert.strictEqual(spy.callCount, 2)
  })

  it('calls updateRange when step changes', () => {
    const wrapper = shallow(<Slider reversed step={10} domain={[100, 200]} />)

    assert.strictEqual(spy.callCount, 1)
    wrapper.setProps({ step: 5, domain: [100, 200] })
    assert.strictEqual(spy.callCount, 2)
  })

  it('calls updateRange when reversed changes', () => {
    const wrapper = shallow(<Slider reversed step={10} domain={[100, 200]} />)

    assert.strictEqual(spy.callCount, 1)
    wrapper.setProps({ reversed: false })
    assert.strictEqual(spy.callCount, 2)
  })
})
