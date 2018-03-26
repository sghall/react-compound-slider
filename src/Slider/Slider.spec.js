// @flow weak
/* eslint-env mocha */
/* eslint react/prop-types: "off" */

import React from 'react'
import sinon from 'sinon'
import { assert } from 'chai'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Rail from '../Rail'
import Handles from '../Handles'
import Slider from './Slider'

configure({ adapter: new Adapter() })

function createClientXY(x, y) {
  return { clientX: x, clientY: y }
}

function createStartTouchEventObject({ x = 0, y = 0 }) {
  return { touches: [createClientXY(x, y)] }
}

describe('<Slider />', () => {
  let setStateSpy,
    updateRangeSpy,
    onMouseDownSpy,
    updateValuesSpy,
    removeListenersSpy

  beforeEach(() => {
    setStateSpy = sinon.spy(Slider.prototype, 'setState')
    updateRangeSpy = sinon.spy(Slider.prototype, 'updateRange')
    onMouseDownSpy = sinon.spy(Slider.prototype, 'onMouseDown')
    updateValuesSpy = sinon.spy(Slider.prototype, 'updateValues')
    removeListenersSpy = sinon.spy(Slider.prototype, 'removeListeners')
  })

  afterEach(() => {
    setStateSpy.restore()
    updateRangeSpy.restore()
    onMouseDownSpy.restore()
    updateValuesSpy.restore()
    removeListenersSpy.restore()
  })

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <Slider reversed step={10} domain={[100, 200]}>
        <div className="unique" />
      </Slider>,
    )

    assert.strictEqual(wrapper.contains(<div className="unique" />), true)
  })

  it("calls updateValues when reversed changes and values prop doesn't", () => {
    const props = {
      step: 10,
      domain: [100, 200],
      values: [110, 120],
    }

    const wrapper = shallow(<Slider reversed={false} {...props} />)

    assert.strictEqual(updateValuesSpy.callCount, 1)
    wrapper.setProps({ reversed: true, ...props })
    assert.strictEqual(updateValuesSpy.callCount, 2)
  })

  it('calls updateValues when values changes', () => {
    const props = {
      reversed: false,
      step: 10,
      domain: [100, 200],
      values: [110, 120],
    }

    const wrapper = shallow(<Slider {...props} />)

    assert.strictEqual(updateValuesSpy.callCount, 1)
    wrapper.setProps({ ...props, values: [130, 140] })
    assert.strictEqual(updateValuesSpy.callCount, 2)
  })

  it('does NOT call updateValues when values is changes to a different Array with the same values', () => {
    const props = {
      reversed: false,
      step: 10,
      domain: [100, 200],
      values: [110, 120],
    }

    const wrapper = shallow(<Slider {...props} />)

    assert.strictEqual(updateValuesSpy.callCount, 1)
    wrapper.setProps({ ...props, values: [110, 120] })
    assert.strictEqual(updateValuesSpy.callCount, 1)
  })

  it('does call onChange/onUpdate when it should', () => {
    const onUpdate = sinon.spy()
    const onChange = sinon.spy()

    const props = {
      onChange,
      onUpdate,
      reversed: false,
      step: 10,
      domain: [100, 200],
      values: [100, 200],
    }

    const wrapper = shallow(<Slider {...props} />)

    assert.strictEqual(onUpdate.callCount, 0)
    assert.strictEqual(onChange.callCount, 0)
    wrapper.setProps({ ...props, domain: [50, 200] })
    assert.strictEqual(onUpdate.callCount, 1)
    assert.strictEqual(onChange.callCount, 1)
  })

  it("does NOT call onChange/onUpdate when it shouldn't", () => {
    const onUpdate = sinon.spy()
    const onChange = sinon.spy()

    const props = {
      onChange,
      onUpdate,
      reversed: false,
      step: 10,
      domain: [100, 200],
      values: [100, 200],
    }

    const wrapper = shallow(<Slider {...props} />)

    assert.strictEqual(onUpdate.callCount, 0)
    assert.strictEqual(onChange.callCount, 0)
    wrapper.setProps({ ...props, domain: [50, 200], values: [50, 200] })
    assert.strictEqual(onUpdate.callCount, 0)
    assert.strictEqual(onChange.callCount, 0)
  })

  it('does NOT call updateRange when reversed, domain and step are unchanged', () => {
    const wrapper = shallow(
      <Slider reversed={false} step={10} domain={[100, 200]} />,
    )

    assert.strictEqual(updateRangeSpy.callCount, 1)
    wrapper.setProps({ reversed: false, step: 10, domain: [100, 200] })
    assert.strictEqual(updateRangeSpy.callCount, 1)
  })

  it('calls updateRange when domain changes', () => {
    const wrapper = shallow(
      <Slider reversed={false} step={10} domain={[100, 200]} />,
    )

    assert.strictEqual(updateRangeSpy.callCount, 1)
    wrapper.setProps({ reversed: true, step: 10, domain: [100, 200] })
    assert.strictEqual(updateRangeSpy.callCount, 2)
  })

  it('calls updateRange when step changes', () => {
    const wrapper = shallow(<Slider reversed step={10} domain={[100, 200]} />)

    assert.strictEqual(updateRangeSpy.callCount, 1)
    wrapper.setProps({ step: 5, domain: [100, 200] })
    assert.strictEqual(updateRangeSpy.callCount, 2)
  })

  it('calls updateRange when reversed changes', () => {
    const wrapper = shallow(<Slider reversed step={10} domain={[100, 200]} />)

    assert.strictEqual(updateRangeSpy.callCount, 1)
    wrapper.setProps({ reversed: false })
    assert.strictEqual(updateRangeSpy.callCount, 2)
  })

  it('calls onMouseDown when descendent emits event', () => {
    const MyRail = ({ getRailProps }) => <div {...getRailProps()} />

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

    assert.strictEqual(onMouseDownSpy.called, true)
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
      <Slider step={1} domain={[0, 100]} values={[25]}>
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
      <Slider step={1} domain={[0, 100]} values={[25]}>
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

  it('does call setState when onMove called with prev !== next', () => {
    const wrapper = mount(<Slider step={1} domain={[0, 100]} values={[25]} />)

    const values = wrapper.state().values
    wrapper.instance().onMove(values, [...values], true)

    assert.strictEqual(setStateSpy.callCount, 2)
  })

  it('does NOT call setState when onMove called with prev === next', () => {
    const wrapper = mount(<Slider step={1} domain={[0, 100]} values={[25]} />)

    const values = wrapper.state().values
    wrapper.instance().onMove(values, values, true)

    assert.strictEqual(setStateSpy.callCount, 1)
  })

  it('calls removeListeners when it unmounts', () => {
    const props = {
      step: 10,
      domain: [100, 200],
      values: [110, 120],
    }

    const wrapper = shallow(<Slider reversed={false} {...props} />)
    wrapper.unmount()

    assert.strictEqual(removeListenersSpy.callCount, 1)
  })

  it('calls onChange when onMouseUp or onTouchEnd are called', () => {
    const props = {
      step: 10,
      domain: [100, 200],
      values: [110, 120],
      onChange: () => {},
    }

    const onChangeSpy = sinon.spy(props, 'onChange')

    const wrapper = shallow(<Slider reversed={false} {...props} />)

    wrapper.instance().onMouseUp()
    assert.strictEqual(onChangeSpy.callCount, 1)

    wrapper.instance().onTouchEnd()
    assert.strictEqual(onChangeSpy.callCount, 2)

    onChangeSpy.restore()
  })
})
