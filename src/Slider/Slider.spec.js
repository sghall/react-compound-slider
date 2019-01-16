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
import * as utils from './utils'

configure({ adapter: new Adapter() })

function createEvent(x = 0, y = 0) {
  return { clientX: x, clientY: y }
}

function createKeyboardEvent(key) {
  return { key }
}

function createTouchEvent({ x, y } = {}) {
  return { touches: [createEvent(x, y)] }
}

const getTestProps = () => ({
  step: 1,
  domain: [100, 200],
  values: [110, 150],
  reversed: false,
})

describe('<Slider />', () => {
  let submitUpdateSpy,
    setStateSpy,
    getStepRangeSpy,
    handleRailAndTrackClicksSpy,
    getHandlesSpy,
    addTouchEventsSpy,
    removeListenersSpy

  beforeEach(() => {
    submitUpdateSpy = sinon.spy(Slider.prototype, 'submitUpdate')
    setStateSpy = sinon.spy(Slider.prototype, 'setState')
    getStepRangeSpy = sinon.spy(utils, 'getStepRange')
    getHandlesSpy = sinon.spy(utils, 'getHandles')
    handleRailAndTrackClicksSpy = sinon.spy(
      Slider.prototype,
      'handleRailAndTrackClicks',
    )
    addTouchEventsSpy = sinon.spy(Slider.prototype, 'addTouchEvents')
    removeListenersSpy = sinon.spy(Slider.prototype, 'removeListeners')
  })

  afterEach(() => {
    submitUpdateSpy.restore()
    setStateSpy.restore()
    getStepRangeSpy.restore()
    handleRailAndTrackClicksSpy.restore()
    getHandlesSpy.restore()
    addTouchEventsSpy.restore()
    removeListenersSpy.restore()
  })

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <Slider {...getTestProps()}>
        <div className="unique" />
      </Slider>,
    )

    assert.strictEqual(wrapper.contains(<div className="unique" />), true)
  })

  it('calls getHandles when reversed changes and values prop doesn\'t', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)

    assert.strictEqual(getHandlesSpy.callCount, 1)
    wrapper.setProps({ ...getTestProps(), reversed: true })
    assert.strictEqual(getHandlesSpy.callCount, 2)
  })

  it('calls getHandles when values change', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)

    assert.strictEqual(getHandlesSpy.callCount, 1)
    wrapper.setProps({ ...getTestProps(), values: [130, 140] })
    assert.strictEqual(getHandlesSpy.callCount, 2)
  })

  it('does NOT call gethandles when values change to a different array with the same values', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)

    const props = {
      ...getTestProps(),
    }

    assert.strictEqual(getHandlesSpy.callCount, 1)
    wrapper.setProps({ ...props, values: [...props.values] })
    assert.strictEqual(getHandlesSpy.callCount, 1)
  })

  it('does call onChange/onUpdate when it should', () => {
    const onUpdate = sinon.spy()
    const onChange = sinon.spy()

    const props = {
      ...getTestProps(),
      onChange,
      onUpdate,
    }

    const wrapper = shallow(<Slider {...props} />)

    assert.strictEqual(onUpdate.callCount, 0)
    assert.strictEqual(onChange.callCount, 0)
    wrapper.setProps({ ...props, domain: [50, 200] })
    assert.strictEqual(onUpdate.callCount, 1)
    assert.strictEqual(onChange.callCount, 1)
  })

  it('does NOT call onChange/onUpdate when it shouldn\'t', () => {
    const onUpdate = sinon.spy()
    const onChange = sinon.spy()

    const props = {
      ...getTestProps(),
      onChange,
      onUpdate,
    }

    const wrapper = shallow(<Slider {...props} />)

    assert.strictEqual(onUpdate.callCount, 0)
    assert.strictEqual(onChange.callCount, 0)
    wrapper.setProps({ ...props, domain: [50, 200], values: [50, 200] })
    assert.strictEqual(onUpdate.callCount, 0)
    assert.strictEqual(onChange.callCount, 0)
  })

  it('does NOT call  when reversed, domain and step are unchanged', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)

    assert.strictEqual(getStepRangeSpy.callCount, 1)
    wrapper.setProps({ ...getTestProps() })
    assert.strictEqual(getStepRangeSpy.callCount, 1)
  })

  it('uses valid value props when domain changes', () => {
    const onUpdate = sinon.spy()
    const onChange = sinon.spy()
    const wrapper = shallow(
      <Slider onUpdate={onUpdate} onChange={onChange} {...getTestProps()} />,
    )

    assert.strictEqual(getStepRangeSpy.callCount, 1)
    assert.strictEqual(getHandlesSpy.callCount, 1)
    wrapper.setProps({ ...getTestProps(), values: [1, 1], domain: [0, 2] })
    assert.strictEqual(getHandlesSpy.callCount, 2)
    assert.strictEqual(getStepRangeSpy.callCount, 2)
    assert.strictEqual(onUpdate.callCount, 0)
    assert.strictEqual(onChange.callCount, 0)
  })

  it('recalculates invalid value when domain changes', () => {
    const onUpdate = sinon.spy()
    const onChange = sinon.spy()
    const wrapper = shallow(
      <Slider onUpdate={onUpdate} onChange={onChange} {...getTestProps()} />,
    )

    assert.strictEqual(getStepRangeSpy.callCount, 1)
    wrapper.setProps({ ...getTestProps(), domain: [1, 2] })
    assert.strictEqual(getHandlesSpy.callCount, 2)
    assert.strictEqual(getStepRangeSpy.callCount, 2)
    assert.strictEqual(onUpdate.callCount, 1)
    assert.strictEqual(onChange.callCount, 1)
  })

  it('calls updateRange when domain changes', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)

    assert.strictEqual(getStepRangeSpy.callCount, 1)
    wrapper.setProps({ ...getTestProps(), domain: [100, 400] })
    assert.strictEqual(getStepRangeSpy.callCount, 2)
  })

  it('calls updateRange when step changes', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)

    assert.strictEqual(getStepRangeSpy.callCount, 1)
    wrapper.setProps({ ...getTestProps(), step: 10 })
    assert.strictEqual(getStepRangeSpy.callCount, 2)
  })

  it('calls updateRange when reversed changes', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)

    assert.strictEqual(getStepRangeSpy.callCount, 1)
    wrapper.setProps({ ...getTestProps(), reversed: true })
    assert.strictEqual(getStepRangeSpy.callCount, 2)
  })

  it('should ALWAYS call submitUpdate when onMouseMove is called', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)

    assert.strictEqual(submitUpdateSpy.callCount, 0)
    wrapper.instance().onMouseMove(createEvent())
    assert.strictEqual(submitUpdateSpy.callCount, 1)
  })

  it('should call submitUpdate when onTouchMove is called', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)

    assert.strictEqual(submitUpdateSpy.callCount, 0)
    wrapper.instance().onTouchMove(createTouchEvent())
    assert.strictEqual(submitUpdateSpy.callCount, 1)
  })

  it('calls handleRailAndTrackClicks when descendent emits event', () => {
    const RailComponent = ({ getRailProps }) => <div {...getRailProps()} />

    const wrapper = mount(
      <Slider {...getTestProps()}>
        <Rail>
          {({ getRailProps }) => {
            return <RailComponent getRailProps={getRailProps} />
          }}
        </Rail>
      </Slider>,
    )

    wrapper.find('RailComponent').simulate('mousedown')
    assert.strictEqual(handleRailAndTrackClicksSpy.called, true)
  })

  describe('disabled', () => {
    const RailComponent = ({ getRailProps }) => <div {...getRailProps()} />

    const sliderProps = {
      ...getTestProps(),
      disabled: true,
      values: [110],
    }

    const HandleComponent = ({ id, getHandleProps }) => (
      <button {...getHandleProps(id)} />
    )

    const wrapper = mount(
      <Slider {...sliderProps}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            )
          }}
        </Handles>
        <Rail>
          {({ getRailProps }) => {
            return <RailComponent getRailProps={getRailProps} />
          }}
        </Rail>
      </Slider>,
    )

    it('should not call keyboard events when disabled', () => {
      wrapper
        .find('HandleComponent')
        .simulate('keydown', createKeyboardEvent('ArrowUp'))
        .simulate('keydown', createKeyboardEvent('ArrowRight'))

      const handles = wrapper.state().handles
      assert.strictEqual(handles[0].val, 110)
    })

    it('should not call mouse events when descendent emits mouse event', () => {
      wrapper.find('RailComponent').simulate('mousedown')
      assert.strictEqual(handleRailAndTrackClicksSpy.called, false)

      wrapper.find('HandleComponent').simulate('mousedown')
      assert.strictEqual(handleRailAndTrackClicksSpy.called, false)
    })
  })

  it('calls handleRailAndTrackClicks when descendent emits touch event', () => {
    const RailComponent = ({ getRailProps }) => {
      return <div {...getRailProps()} />
    }

    const wrapper = mount(
      <Slider {...getTestProps()}>
        <Rail>
          {({ getRailProps }) => {
            return <RailComponent getRailProps={getRailProps} />
          }}
        </Rail>
      </Slider>,
    )

    wrapper
      .find('RailComponent')
      .simulate('touchstart', createTouchEvent({ x: 100, y: 0 }))

    assert.strictEqual(handleRailAndTrackClicksSpy.called, true)
    handleRailAndTrackClicksSpy.restore()
  })

  it('calls addTouchEvents when descendent emits touch event with an id', () => {
    const HandleComponent = ({ id, getHandleProps }) => (
      <button {...getHandleProps(id)} />
    )

    const wrapper = mount(
      <Slider {...getTestProps()}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            )
          }}
        </Handles>
      </Slider>,
    )

    wrapper
      .find('HandleComponent')
      .simulate('touchstart', createTouchEvent({ x: 100, y: 0 }))

    assert.strictEqual(addTouchEventsSpy.called, true)
    addTouchEventsSpy.restore()
  })

  it('calls addTouchEvents when descendent emits event with an id', () => {
    const HandleComponent = ({ id, getHandleProps }) => (
      <button {...getHandleProps(id)} />
    )

    const wrapper = mount(
      <Slider {...getTestProps()}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            )
          }}
        </Handles>
      </Slider>,
    )

    wrapper
      .find('HandleComponent')
      .simulate('touchstart', createTouchEvent({ x: 100, y: 0 }))

    assert.strictEqual(addTouchEventsSpy.called, true)
  })

  it('should call submitUpdate ONLY when a valid key is pressed', () => {
    const HandleComponent = ({ id, getHandleProps }) => (
      <button {...getHandleProps(id)} />
    )

    const wrapper = mount(
      <Slider {...getTestProps()}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            )
          }}
        </Handles>
      </Slider>,
    )

    assert.strictEqual(submitUpdateSpy.callCount, 0)
    wrapper
      .find('HandleComponent')
      .simulate('keydown', createKeyboardEvent('ArrowUp'))
    assert.strictEqual(submitUpdateSpy.callCount, 1)
    wrapper
      .find('HandleComponent')
      .simulate('keydown', createKeyboardEvent('Escape'))
    assert.strictEqual(submitUpdateSpy.callCount, 1)
    wrapper
      .find('HandleComponent')
      .simulate('keydown', createKeyboardEvent('ArrowLeft'))
    assert.strictEqual(submitUpdateSpy.callCount, 2)
  })

  it('should not go over the domain when using the keyboard', () => {
    const onChange = sinon.spy()

    const HandleComponent = ({ id, getHandleProps }) => (
      <button {...getHandleProps(id)} />
    )

    const props = {
      ...getTestProps(),
      step: 5,
      values: [105],
      onChange,
    }

    const wrapper = mount(
      <Slider {...props}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            )
          }}
        </Handles>
      </Slider>,
    )

    wrapper
      .find('HandleComponent')
      .simulate('keydown', createKeyboardEvent('ArrowDown'))
    assert.deepEqual(onChange.getCall(0).args[0], [100])
    wrapper
      .find('HandleComponent')
      .simulate('keydown', createKeyboardEvent('ArrowDown'))
    assert.deepEqual(onChange.getCall(0).args[0], [100])
  })

  it('does call setState when submitUpdate called', () => {
    const wrapper = mount(<Slider {...getTestProps()} />)

    const values = wrapper.state().values
    wrapper.instance().submitUpdate(values, [...values], true)

    assert.strictEqual(setStateSpy.callCount, 1)
  })

  it('calls removeListeners when it unmounts', () => {
    const wrapper = shallow(<Slider {...getTestProps()} />)
    wrapper.unmount()

    assert.strictEqual(removeListenersSpy.callCount, 1)
  })

  it('calls onChange when onMouseUp or onTouchEnd are called', () => {
    const onChange = sinon.spy()

    const props = {
      ...getTestProps(),
      onChange,
    }

    const wrapper = shallow(<Slider {...props} />)

    wrapper.instance().onMouseUp()
    assert.strictEqual(onChange.callCount, 1)

    wrapper.instance().onTouchEnd()
    assert.strictEqual(onChange.callCount, 2)
  })

  it('calls onUpdate/onChange on initial render when values are NOT valid steps', () => {
    const onUpdate = sinon.spy()
    const onChange = sinon.spy()

    const props = {
      ...getTestProps(),
      values: [110.5, 150],
      onUpdate,
      onChange,
    }

    shallow(<Slider {...props} />)

    assert.strictEqual(onUpdate.callCount, 1)
    assert.strictEqual(onChange.callCount, 1)
  })

  it('calls onUpdate/onChange on props update when values are NOT valid steps', () => {
    const onUpdate = sinon.spy()
    const onChange = sinon.spy()

    const props = {
      ...getTestProps(),
      values: [110, 150],
      onUpdate,
      onChange,
    }

    const wrapper = shallow(<Slider {...props} />)
    wrapper.setProps({ values: [110.5, 150] }) // update with invalid 110.5

    assert.strictEqual(onUpdate.callCount, 1)
    assert.strictEqual(onChange.callCount, 1)

    wrapper.setProps({ values: [120, 150] }) // update with valid values

    assert.strictEqual(onUpdate.callCount, 1)
    assert.strictEqual(onChange.callCount, 1)

    wrapper.setProps({ values: [120, 150.5] }) // update with invalid 150.5

    assert.strictEqual(onUpdate.callCount, 2)
    assert.strictEqual(onChange.callCount, 2)
  })
})
