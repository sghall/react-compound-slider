import React, { PureComponent, Fragment } from 'react'
import warning from 'warning'
import PropTypes from 'prop-types'
import Rail from '../Rail'
import Ticks from '../Ticks'
import Tracks from '../Tracks'
import Handles from '../Handles'
import { mode1, mode2, mode3 } from './modes'
import {
  isNotValidTouch,
  getTouchPosition,
  getUpdatedHandles,
  getSliderDomain,
  getHandles,
  prfx,
} from './utils'
import LinearScale from './LinearScale'
import DiscreteScale from './DiscreteScale'

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined'

const noop = () => {}

const compare = b => (m, d, i) => m && b[i] === d

const equal = (a, b) => {
  return a === b || (a.length === b.length && a.reduce(compare(b), true))
}

const getNextValue = (curr, step, domain, reversed) => {
  const newVal = reversed ? curr - step : curr + step
  return reversed ? Math.max(domain[0], newVal) : Math.min(domain[1], newVal)
}

const getPrevValue = (curr, step, domain, reversed) => {
  const newVal = reversed ? curr + step : curr - step
  return reversed ? Math.min(domain[1], newVal) : Math.max(domain[0], newVal)
}

class Slider extends PureComponent {
  state = {
    step: null,
    values: null,
    domain: null,
    handles: null,
    reversed: null,
    activeHandleID: null,
    valueToPerc: null,
    valueToStep: null,
    pixelToStep: null,
  }

  _isMounted = false
  slider = React.createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      step,
      values,
      domain,
      reversed,
      onUpdate,
      onChange,
      warnOnChanges,
    } = nextProps

    let valueToPerc = prevState.valueToPerc
    let valueToStep = prevState.valueToStep
    let pixelToStep = prevState.pixelToStep

    const nextState = {}

    if (!valueToPerc || !valueToStep || !pixelToStep) {
      valueToPerc = new LinearScale()
      valueToStep = new DiscreteScale()
      pixelToStep = new DiscreteScale()

      nextState.valueToPerc = valueToPerc
      nextState.valueToStep = valueToStep
      nextState.pixelToStep = pixelToStep
    }

    if (
      prevState.step === null ||
      prevState.domain === null ||
      prevState.reversed === null ||
      step !== prevState.step ||
      domain[0] !== prevState.domain[0] ||
      domain[1] !== prevState.domain[1] ||
      reversed !== prevState.reversed
    ) {
      const [min, max] = domain

      valueToStep
        .setStep(step)
        .setRange([min, max])
        .setDomain([min, max])

      if (reversed === true) {
        valueToPerc.setDomain([min, max]).setRange([100, 0])
        pixelToStep.setStep(step).setRange([max, min])
      } else {
        valueToPerc.setDomain([min, max]).setRange([0, 100])
        pixelToStep.setStep(step).setRange([min, max])
      }

      warning(
        max > min,
        `${prfx} Max must be greater than min (even if reversed). Max is ${max}. Min is ${min}.`,
      )

      const { handles, changes } = getHandles(
        values || prevState.values,
        reversed,
        valueToStep,
        warnOnChanges,
      )

      if (changes || values === undefined || values === prevState.values) {
        onUpdate(handles.map(d => d.val))
        onChange(handles.map(d => d.val))
      }

      nextState.step = step
      nextState.values = values
      nextState.domain = domain
      nextState.handles = handles
      nextState.reversed = reversed
    } else if (!equal(values, prevState.values)) {
      const { handles, changes } = getHandles(
        values,
        reversed,
        valueToStep,
        warnOnChanges,
      )

      if (changes) {
        onUpdate(handles.map(d => d.val))
        onChange(handles.map(d => d.val))
      }

      nextState.values = values
      nextState.handles = handles
    }

    if (Object.keys(nextState).length) {
      return nextState
    }

    return null
  }

  componentDidMount() {
    this._isMounted = true
    const { pixelToStep } = this.state
    const { vertical } = this.props

    pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical))
  }

  componentWillUnmount() {
    this.removeListeners()
    this._isMounted = false
  }

  removeListeners() {
    if (isBrowser) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
      document.removeEventListener('touchmove', this.onTouchMove)
      document.removeEventListener('touchend', this.onTouchEnd)
    }
  }

  onKeyDown = (e, handleID) => {
    let validUpKeys = ['ArrowRight', 'ArrowUp']
    let validDownKeys = ['ArrowDown', 'ArrowLeft']
    const {
      state: { handles },
      props: { step, reversed, vertical, domain },
    } = this
    const key = e.key || e.keyCode

    if (!validUpKeys.concat(validDownKeys).includes(key)) {
      return
    }

    if (vertical) {
      [validUpKeys, validDownKeys] = [validDownKeys, validUpKeys]
    }

    e.stopPropagation && e.stopPropagation()
    e.preventDefault && e.preventDefault()

    const found = handles.find(value => {
      return value.key === handleID
    })
    if (!found) {
      return
    }

    const currVal = found.val
    let newVal = currVal

    if (validUpKeys.includes(key)) {
      newVal = getNextValue(currVal, step, domain, reversed)
    } else if (validDownKeys.includes(key)) {
      newVal = getPrevValue(currVal, step, domain, reversed)
    }
    const nextHandles = handles.map(v =>
      v.key === handleID ? { key: v.key, val: newVal } : v,
    )

    this.submitUpdate(nextHandles, true)
  }

  onMouseDown = (e, handleID) => {
    this.onStart(e, handleID, false)
  }

  onTouchStart = (e, handleID) => {
    if (isNotValidTouch(e)) {
      return
    }

    this.onStart(e, handleID, true)
  }

  onStart(e, handleID, isTouch) {
    const {
      state: { handles },
      props: { onSlideStart },
    } = this

    e.stopPropagation && e.stopPropagation()
    e.preventDefault && e.preventDefault()

    const found = handles.find(value => {
      return value.key === handleID
    })

    if (found) {
      this.setState({ activeHandleID: handleID })
      onSlideStart(handles.map(d => d.val), { activeHandleID: handleID })
      isTouch ? this.addTouchEvents() : this.addMouseEvents()
    } else {
      this.setState({ activeHandleID: null })
      this.handleRailAndTrackClicks(e, isTouch)
    }
  }

  handleRailAndTrackClicks(e, isTouch) {
    const {
      state: { handles: curr, pixelToStep },
      props: { vertical, reversed },
    } = this
    const { slider } = this

    // double check the dimensions of the slider
    pixelToStep.setDomain(getSliderDomain(slider.current, vertical))

    // find the closest value (aka step) to the event location
    let updateValue

    if (isTouch) {
      updateValue = pixelToStep.getValue(getTouchPosition(vertical, e))
    } else {
      updateValue = pixelToStep.getValue(vertical ? e.clientY : e.pageX)
    }

    // find the closest handle key
    let updateKey = null
    let minDiff = Infinity

    for (let i = 0; i < curr.length; i++) {
      const { key, val } = curr[i]
      const diff = Math.abs(val - updateValue)

      if (diff < minDiff) {
        updateKey = key
        minDiff = diff
      }
    }

    // generate a "candidate" set of values - a suggestion of what to do
    const nextHandles = getUpdatedHandles(
      curr,
      updateKey,
      updateValue,
      reversed,
    )

    // submit the candidate values
    this.submitUpdate(nextHandles, true)
  }

  getEventData = (e, isTouch) => {
    const {
      state: { pixelToStep, valueToPerc },
      props: { vertical },
    } = this
    // double check the dimensions of the slider
    pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical))

    let value

    if (isTouch) {
      value = pixelToStep.getValue(getTouchPosition(vertical, e))
    } else {
      value = pixelToStep.getValue(vertical ? e.clientY : e.pageX)
    }

    return {
      value,
      percent: valueToPerc.getValue(value),
    }
  }

  addMouseEvents() {
    if (isBrowser) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    }
  }

  addTouchEvents() {
    if (isBrowser) {
      document.addEventListener('touchmove', this.onTouchMove)
      document.addEventListener('touchend', this.onTouchEnd)
    }
  }

  onMouseMove = e => {
    const {
      state: { handles: curr, pixelToStep, activeHandleID },
      props: { vertical, reversed },
    } = this
    // double check the dimensions of the slider
    pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical))

    // find the closest value (aka step) to the event location
    const updateValue = pixelToStep.getValue(vertical ? e.clientY : e.pageX)

    // generate a "candidate" set of values - a suggestion of what to do
    const nextHandles = getUpdatedHandles(
      curr,
      activeHandleID,
      updateValue,
      reversed,
    )

    // submit the candidate values
    this.submitUpdate(nextHandles)
  }

  onTouchMove = e => {
    const {
      state: { handles: curr, pixelToStep, activeHandleID },
      props: { vertical, reversed },
    } = this
    if (isNotValidTouch(e)) {
      return
    }

    // double check the dimensions of the slider
    pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical))

    // find the closest value (aka step) to the event location
    const updateValue = pixelToStep.getValue(getTouchPosition(vertical, e))

    // generate a "candidate" set of values - a suggestion of what to do
    const nextHandles = getUpdatedHandles(
      curr,
      activeHandleID,
      updateValue,
      reversed,
    )

    // submit the candidate values
    this.submitUpdate(nextHandles)
  }

  submitUpdate(next, callOnChange) {
    const { mode, step, onUpdate, onChange, reversed } = this.props
    const { getValue } = this.state.valueToStep

    this.setState(({ handles: curr }) => {
      let handles

      // given the current handles and a candidate set, decide what to do
      if (typeof mode === 'function') {
        handles = mode(curr, next, step, reversed, getValue)
        warning(
          Array.isArray(handles),
          'Custom mode function did not return an array.',
        )
      } else {
        switch (mode) {
          case 1:
            handles = mode1(curr, next)
            break
          case 2:
            handles = mode2(curr, next)
            break
          case 3:
            handles = mode3(curr, next, step, reversed, getValue)
            break
          default:
            handles = next
            warning(false, `${prfx} Invalid mode value.`)
        }
      }

      onUpdate(handles.map(d => d.val))

      if (callOnChange) {
        onChange(handles.map(d => d.val))
      }

      return { handles }
    })
  }

  onMouseUp = () => {
    const {
      state: { handles, activeHandleID },
      props: { onChange, onSlideEnd },
    } = this

    onChange(handles.map(d => d.val))
    onSlideEnd(handles.map(d => d.val), { activeHandleID })

    if (this._isMounted) {
      this.setState({ activeHandleID: null })
    }

    if (isBrowser) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  onTouchEnd = () => {
    const {
      state: { handles, activeHandleID },
      props: { onChange, onSlideEnd },
    } = this

    onChange(handles.map(d => d.val))
    onSlideEnd(handles.map(d => d.val), { activeHandleID })

    if (this._isMounted) {
      this.setState({ activeHandleID: null })
    }

    if (isBrowser) {
      document.removeEventListener('touchmove', this.onTouchMove)
      document.removeEventListener('touchend', this.onTouchEnd)
    }
  }

  render() {
    const {
      state: { handles, valueToPerc, activeHandleID },
      props: {
        className,
        rootStyle,
        rootProps,
        component: Comp,
        disabled,
        flatten,
      },
    } = this

    const mappedHandles = handles.map(({ key, val }) => {
      return { id: key, value: val, percent: valueToPerc.getValue(val) }
    })

    const children = React.Children.map(this.props.children, child => {
      if (
        child &&
        (child.type.name === Rail.name ||
          child.type.name === Ticks.name ||
          child.type.name === Tracks.name ||
          child.type.name === Handles.name)
      ) {
        return React.cloneElement(child, {
          scale: valueToPerc,
          handles: mappedHandles,
          activeHandleID,
          getEventData: this.getEventData,
          emitKeyboard: disabled ? noop : this.onKeyDown,
          emitMouse: disabled ? noop : this.onMouseDown,
          emitTouch: disabled ? noop : this.onTouchStart,
        })
      }

      return child
    })

    return flatten ? (
      <Fragment>
        <Comp
          {...rootProps}
          style={rootStyle}
          className={className}
          ref={this.slider}
        />
        {children}
      </Fragment>
    ) : (
      <Comp
        {...rootProps}
        style={rootStyle}
        className={className}
        ref={this.slider}
      >
        {children}
      </Comp>
    )
  }
}

Slider.propTypes = {
  /**
   * String component used for slider root. Defaults to 'div'.
   */
  component: PropTypes.string,
  /**
   * An object with any inline styles you want applied to the root element.
   */
  rootStyle: PropTypes.object,
  /**
   * An object with any props you want applied to the root element.
   */
  rootProps: PropTypes.object,
  /**
   * CSS class name applied to the root element of the slider.
   */
  className: PropTypes.string,
  /**
   * Two element array of numbers providing the min and max values for the slider [min, max] e.g. [0, 100].
   * It does not matter if the slider is reversed on the screen, domain is always [min, max] with min < max.
   */
  domain: PropTypes.array,
  /**
   * An array of numbers. You can supply one for a value slider, two for a range slider or more to create n-handled sliders.
   * The values should correspond to valid step values in the domain.
   * The numbers will be forced into the domain if they are two small or large.
   */
  values: PropTypes.array,
  /**
   * The step value for the slider.
   */
  step: PropTypes.number,
  /**
   * The interaction mode. Value of 1 will allow handles to cross each other.
   * Value of 2 will keep the sliders from crossing and separated by a step.
   * Value of 3 will make the handles pushable and keep them a step apart.
   * ADVANCED: You can also supply a function that will be passed the current values and the incoming update.
   * Your function should return what the state should be set as.
   */
  mode: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  /**
   * Set to true if the slider is displayed vertically to tell the slider to use the height to calculate positions.
   */
  vertical: PropTypes.bool,
  /**
   * Reverse the display of slider values.
   */
  reversed: PropTypes.bool,
  /**
   * Function triggered when the value of the slider has changed. This will recieve changes at the end of a slide as well as changes from clicks on rails and tracks. Receives values.
   */
  onChange: PropTypes.func,
  /**
   * Function called with the values at each update (caution: high-volume updates when dragging). Receives values.
   */
  onUpdate: PropTypes.func,
  /**
   * Function triggered with ontouchstart or onmousedown on a handle. Receives values.
   */
  onSlideStart: PropTypes.func,
  /**
   * Function triggered on ontouchend or onmouseup on a handle. Receives values.
   */
  onSlideEnd: PropTypes.func,
  /**
   * Ignore all mouse, touch and keyboard events.
   */
  disabled: PropTypes.bool,
  /**
   * Render slider children as siblings. This is primarily for SVG sliders. See the SVG example.
   */
  flatten: PropTypes.bool,
  /**
   * When true, the slider will warn if values are changed to fit domain and step values.  Defaults to false.
   */
  warnOnChanges: PropTypes.bool,
  /**
   * Component children to render.
   */
  children: PropTypes.any,
}

Slider.defaultProps = {
  mode: 1,
  step: 0.1,
  domain: [0, 100],
  component: 'div',
  rootProps: {},
  rootStyle: {},
  vertical: false,
  reversed: false,
  onChange: noop,
  onUpdate: noop,
  onSlideStart: noop,
  onSlideEnd: noop,
  disabled: false,
  flatten: false,
  warnOnChanges: false,
}

export default Slider
