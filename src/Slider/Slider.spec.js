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

function createClientXY(x, y) {
  return { clientX: x, clientY: y }
}

function createStartTouchEventObject({ x = 0, y = 0 }) {
  return { touches: [createClientXY(x, y)] }
}

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
    const MyRail = ({ getRailProps }) => <div {...getRailProps()} />

    const eventSpy = sinon.spy(Slider.prototype, 'onMouseDown')

    const wrapper = mount(
      <Slider step={10} domain={[100, 200]}>
        <Rail>
          {({ getRailProps }) => {
            return <MyRail getRailProps={getRailProps} />
          }}
        </Rail>
      </Slider>,
    )

    wrapper.find('MyRail').simulate('mousedown')

    assert.strictEqual(eventSpy.called, true)
    eventSpy.restore()
  })

  it('calls onTouchStart when descendent emits event', () => {
    const MyRail = ({ getRailProps }) => {
      return <div {...getRailProps()} />
    }

    const eventSpy = sinon.spy(Slider.prototype, 'onTouchStart')

    const wrapper = mount(
      <Slider step={10} domain={[100, 200]}>
        <Rail>
          {({ getRailProps }) => {
            return <MyRail getRailProps={getRailProps} />
          }}
        </Rail>
      </Slider>,
    )

    wrapper
      .find('MyRail')
      .simulate('touchstart', createStartTouchEventObject({ x: 100, y: 0 }))

    assert.strictEqual(eventSpy.called, true)
    eventSpy.restore()
  })

  it('calls addMouseEvents when descendent emits event with an id', () => {
    const MyHandle = ({ id, getHandleProps }) => <div {...getHandleProps(id)} />

    const eventSpy = sinon.spy(Slider.prototype, 'addMouseEvents')

    const wrapper = mount(
      <Slider step={1} domain={[0, 100]} defaultValues={[25]}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <MyHandle id={handles[0].id} getHandleProps={getHandleProps} />
            )
          }}
        </Handles>
      </Slider>,
    )

    wrapper.find('MyHandle').simulate('mousedown')

    assert.strictEqual(eventSpy.called, true)
    eventSpy.restore()
  })

  it('calls addTouchEvents when descendent emits event with an id', () => {
    const MyHandle = ({ id, getHandleProps }) => <div {...getHandleProps(id)} />

    const eventSpy = sinon.spy(Slider.prototype, 'addTouchEvents')

    const wrapper = mount(
      <Slider step={1} domain={[0, 100]} defaultValues={[25]}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <MyHandle id={handles[0].id} getHandleProps={getHandleProps} />
            )
          }}
        </Handles>
      </Slider>,
    )

    wrapper
      .find('MyHandle')
      .simulate('touchstart', createStartTouchEventObject({ x: 100, y: 0 }))

    assert.strictEqual(eventSpy.called, true)
    eventSpy.restore()
  })
})
