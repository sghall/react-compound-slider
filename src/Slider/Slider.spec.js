// @flow weak
/* eslint-env mocha */
/* eslint react/prop-types: "off" */

import React from 'react'
import sinon from 'sinon'
import { assert } from 'chai'
import { shallow, mount } from 'enzyme'
import Rail from '../Rail'
import Handles from '../Handles'
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

  it('calls onMouseDown when descendent emits event', () => {
    const MyRail = ({ emitMouse }) => <div onMouseDown={e => emitMouse(e)} />

    const eventSpy = sinon.spy(Slider.prototype, 'onMouseDown')

    const wrapper = mount(
      <Slider step={10} domain={[100, 200]}>
        <Rail>
          {({ emitMouse }) => {
            return <MyRail emitMouse={emitMouse} />
          }}
        </Rail>
      </Slider>,
    )

    wrapper.find('MyRail').simulate('mousedown')

    assert.strictEqual(eventSpy.called, true)
    eventSpy.restore()
  })

  it('calls onTouchStart when descendent emits event', () => {
    const mockTouch = { type: 'touchstart', touches: [{ pageX: 100 }] }

    const MyRail = ({ emitTouch }) => {
      return <div onTouchStart={() => emitTouch(mockTouch)} />
    }

    const eventSpy = sinon.spy(Slider.prototype, 'onTouchStart')

    const wrapper = mount(
      <Slider step={10} domain={[100, 200]}>
        <Rail>
          {({ emitTouch }) => {
            return <MyRail emitTouch={emitTouch} />
          }}
        </Rail>
      </Slider>,
    )

    wrapper.find('MyRail').simulate('touchstart')

    assert.strictEqual(eventSpy.called, true)
    eventSpy.restore()
  })

  it('calls addMouseEvents when descendent emits event with an id', () => {
    const MyHandle = ({ id, emitMouse }) => (
      <div onMouseDown={e => emitMouse(e, id)} />
    )

    const eventSpy = sinon.spy(Slider.prototype, 'addMouseEvents')

    const wrapper = mount(
      <Slider step={1} domain={[0, 100]} defaultValues={[25]}>
        <Handles>
          {({ handles, emitMouse }) => {
            return <MyHandle id={handles[0].id} emitMouse={emitMouse} />
          }}
        </Handles>
      </Slider>,
    )

    wrapper.find('MyHandle').simulate('mousedown')

    assert.strictEqual(eventSpy.called, true)
    eventSpy.restore()
  })

  it('calls addTouchEvents when descendent emits event with an id', () => {
    const mockTouch = { type: 'touchstart', touches: [{ pageX: 100 }] }

    const MyHandle = ({ id, emitTouch }) => (
      <div onTouchStart={() => emitTouch(mockTouch, id)} />
    )

    const eventSpy = sinon.spy(Slider.prototype, 'addTouchEvents')

    const wrapper = mount(
      <Slider step={1} domain={[0, 100]} defaultValues={[25]}>
        <Handles>
          {({ handles, emitTouch }) => {
            return <MyHandle id={handles[0].id} emitTouch={emitTouch} />
          }}
        </Handles>
      </Slider>,
    )

    wrapper.find('MyHandle').simulate('touchstart')

    assert.strictEqual(eventSpy.called, true)
    eventSpy.restore()
  })
})
