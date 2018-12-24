import React, { PureComponent } from 'react'
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
  getUpdatedValues,
  getSliderDomain,
  getStepRange,
  getSortByVal,
} from './utils'
import LinearScale from './LinearScale'
import DiscreteScale from './DiscreteScale'

const prfx = 'react-compound-slider:'

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined'

const noop = () => {}

const compare = b => (m, d, i) => m && b[i] === d

const equal = (a, b) => {
  return a === b || (a.length === b.length && a.reduce(compare(b), true))
}

const getNextValue = (curr, step, domain, reversed) => {
  let newVal = curr
  newVal = reversed ? curr - step : curr + step
  return reversed ? Math.max(domain[0], newVal) : Math.min(domain[1], newVal)
}

const getPrevValue = (curr, step, domain, reversed) => {
  let newVal = curr
  newVal = reversed ? curr + step : curr - step
  return reversed ? Math.min(domain[1], newVal) : Math.max(domain[0], newVal)
}

class Slider extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { values: [] }
    const { disabled } = props

    this.slider = null

    this.valueToPerc = new LinearScale()
    this.valueToStep = new DiscreteScale()
    this.pixelToStep = new DiscreteScale()

    this.onMouseMove = disabled ? noop : this.onMouseMove.bind(this)
    this.onTouchMove = disabled ? noop : this.onTouchMove.bind(this)
    this.submitUpdate = this.submitUpdate.bind(this)

    this.onMouseDown = disabled ? noop : this.onMouseDown.bind(this)
    this.onTouchStart = disabled ? noop : this.onTouchStart.bind(this)
    this.onKeyDown = disabled ? noop : this.onKeyDown.bind(this)
    this.onStart = disabled ? noop : this.onStart.bind(this)

    this.onMouseUp = disabled ? noop : this.onMouseUp.bind(this)
    this.onTouchEnd = disabled ? noop : this.onTouchEnd.bind(this)
  }

  componentWillMount() {
    const { values, domain, step, reversed } = this.props

    this.updateRange(domain, step, reversed)
    this.setValues(values, reversed)
  }

  componentWillReceiveProps(next) {
    const { domain, step, reversed, values } = next
    const { props } = this

    if (
      domain[0] !== props.domain[0] ||
      domain[1] !== props.domain[1] ||
      step !== props.step ||
      reversed !== props.reversed
    ) {
      this.updateRange(domain, step, reversed)
      // after adjusting the range based on the changed domain or step, make sure to update the values
      // to fit with the new range
      const remapped = this.reMapValues(reversed, values)

      if (values === undefined || values === props.values) {
        next.onChange(remapped)
        next.onUpdate(remapped)
      }
    } else if (!equal(values, props.values)) {
      // if domain didnt change, but the value props did, set the values
      this.setValues(values, reversed)
    }
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  removeListeners() {
    if (isBrowser) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
      document.removeEventListener('touchmove', this.onTouchMove)
      document.removeEventListener('touchend', this.onTouchEnd)
    }
  }

  reMapValues(reversed, values) {
    // if values was not passed, fall back to using state
    return this.setValues(values || this.state.values.map(d => d.val), reversed)
  }

  setValues(arr = [], reversed) {
    let changes = 0

    const values = arr
      .map(x => {
        const val = this.valueToStep.getValue(x)

        if (x !== val) {
          changes += 1
          warning(
            false,
            `${prfx} Invalid value encountered. Changing ${x} to ${val}.`,
          )
        }

        return val
      })
      .map((val, i) => ({ key: `$$-${i}`, val }))
      .sort(getSortByVal(reversed))

    const valuesArr = values.map(d => d.val)

    if (changes > 0) {
      this.props.onUpdate(valuesArr)
      this.props.onChange(valuesArr)
    }

    this.setState(() => ({ values }))

    return valuesArr
  }

  updateRange([min, max], step, reversed) {
    const range = getStepRange(min, max, step)

    this.valueToStep.setRange(range).setDomain([min - step / 2, max + step / 2])

    if (reversed === true) {
      this.valueToPerc.setDomain([min, max]).setRange([100, 0])
      range.reverse()
    } else {
      this.valueToPerc.setDomain([min, max]).setRange([0, 100])
    }

    this.pixelToStep.setRange(range)

    warning(
      max > min,
      `${prfx} Max must be greater than min (even if reversed). Max is ${max}. Min is ${min}.`,
    )

    const maxInRange = 100001

    warning(
      range.length <= maxInRange,
      `${prfx} Increase step value (set to ${step} currently). Found ${range.length.toLocaleString()} values in range. Max is ${maxInRange.toLocaleString()}.`,
    )

    const last = range.length - 1

    warning(
      range[reversed ? last : 0] === min && range[reversed ? 0 : last] === max,
      `${prfx} The range is incorrectly calculated. Check domain (min, max) and step values.`,
    )
  }

  onKeyDown(e, handleID) {
    let validUpKeys = ['ArrowRight', 'ArrowUp']
    let validDownKeys = ['ArrowDown', 'ArrowLeft']
    const {
      state: { values },
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

    const found = values.find(value => {
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
    const nextValues = values.map(
      v => (v.key === handleID ? { key: v.key, val: newVal } : v),
    )

    this.submitUpdate(nextValues, true)
  }

  onMouseDown(e, handleID) {
    this.onStart(e, handleID, false)
  }

  onTouchStart(e, handleID) {
    if (isNotValidTouch(e)) {
      return
    }

    this.onStart(e, handleID, true)
  }

  onStart(e, handleID, isTouch) {
    const { state: { values }, props: { onSlideStart } } = this

    e.stopPropagation && e.stopPropagation()
    e.preventDefault && e.preventDefault()

    const found = values.find(value => {
      return value.key === handleID
    })

    if (found) {
      this.active = handleID
      onSlideStart(values.map(d => d.val), { activeHandleID: handleID })
      isTouch ? this.addTouchEvents() : this.addMouseEvents()
    } else {
      this.active = null
      this.handleRailAndTrackClicks(e, isTouch)
    }
  }

  handleRailAndTrackClicks(e, isTouch) {
    const { state: { values: curr }, props: { vertical, reversed } } = this
    const { slider } = this

    // double check the dimensions of the slider
    this.pixelToStep.setDomain(
      getSliderDomain(slider, vertical, this.pixelToStep),
    )

    // find the closest value (aka step) to the event location
    let updateValue

    if (isTouch) {
      updateValue = this.pixelToStep.getValue(getTouchPosition(vertical, e))
    } else {
      updateValue = this.pixelToStep.getValue(vertical ? e.clientY : e.pageX)
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
    const nextValues = getUpdatedValues(curr, updateKey, updateValue, reversed)

    // submit the candidate values
    this.submitUpdate(nextValues, true)
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

  onMouseMove(e) {
    const { state: { values: curr }, props: { vertical, reversed } } = this
    const { active: updateKey, slider } = this

    // double check the dimensions of the slider
    this.pixelToStep.setDomain(
      getSliderDomain(slider, vertical, this.pixelToStep),
    )

    // find the closest value (aka step) to the event location
    const updateValue = this.pixelToStep.getValue(
      vertical ? e.clientY : e.pageX,
    )

    // generate a "candidate" set of values - a suggestion of what to do
    const nextValues = getUpdatedValues(curr, updateKey, updateValue, reversed)

    // submit the candidate values
    this.submitUpdate(nextValues)
  }

  onTouchMove(e) {
    const { state: { values: curr }, props: { vertical, reversed } } = this
    const { active: updateKey, slider } = this

    if (isNotValidTouch(e)) {
      return
    }

    // double check the dimensions of the slider
    this.pixelToStep.setDomain(
      getSliderDomain(slider, vertical, this.pixelToStep),
    )

    // find the closest value (aka step) to the event location
    const updateValue = this.pixelToStep.getValue(getTouchPosition(vertical, e))

    // generate a "candidate" set of values - a suggestion of what to do
    const nextValues = getUpdatedValues(curr, updateKey, updateValue, reversed)

    // submit the candidate values
    this.submitUpdate(nextValues)
  }

  submitUpdate(next, callOnChange) {
    const { mode, step, onUpdate, onChange, reversed } = this.props
    const { getValue } = this.valueToStep

    this.setState(({ values: curr }) => {
      let values

      // given the current values and a candidate set, decide what to do
      if (typeof mode === 'function') {
        values = mode(curr, next, step, reversed, getValue)
        warning(
          Array.isArray(values),
          `Custom mode function did not return an array.`,
        )
      } else {
        switch (mode) {
          case 1:
            values = mode1(curr, next)
            break
          case 2:
            values = mode2(curr, next)
            break
          case 3:
            values = mode3(curr, next, step, reversed, getValue)
            break
          default:
            values = next
            warning(false, `${prfx} Invalid mode value.`)
        }
      }

      onUpdate(values.map(d => d.val))

      if (callOnChange) {
        onChange(values.map(d => d.val))
      }

      return { values }
    })
  }

  onMouseUp() {
    const { state: { values }, props: { onChange, onSlideEnd } } = this
    const activeHandleID = this.active
    this.active = null

    onChange(values.map(d => d.val))
    onSlideEnd(values.map(d => d.val), { activeHandleID })

    if (isBrowser) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  onTouchEnd() {
    const { state: { values }, props: { onChange, onSlideEnd } } = this
    this.active = null

    onChange(values.map(d => d.val))
    onSlideEnd(values.map(d => d.val))

    if (isBrowser) {
      document.removeEventListener('touchmove', this.onTouchMove)
      document.removeEventListener('touchend', this.onTouchEnd)
    }
  }

  render() {
    const { state: { values }, props: { className, rootStyle } } = this

    const handles = values.map(({ key, val }) => {
      return { id: key, value: val, percent: this.valueToPerc.getValue(val) }
    })

    const children = React.Children.map(this.props.children, child => {
      if (
        child.type.name === Rail.name ||
        child.type.name === Ticks.name ||
        child.type.name === Tracks.name ||
        child.type.name === Handles.name
      ) {
        return React.cloneElement(child, {
          scale: this.valueToPerc,
          handles,
          emitKeyboard: this.onKeyDown,
          emitMouse: this.onMouseDown,
          emitTouch: this.onTouchStart,
        })
      }

      return child
    })

    return (
      <div
        style={rootStyle || {}}
        className={className}
        ref={d => (this.slider = d)}
      >
        {children}
      </div>
    )
  }
}

Slider.propTypes = {
  /**
   * CSS class name applied to the root div of the slider.
   */
  className: PropTypes.string,
  /**
   * An object with any inline styles you want applied to the root div.
   */
  rootStyle: PropTypes.object,
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
   * Ignore all mouse, touch and keyboard events
   */
  disabled: PropTypes.bool,
  /**
   * Component children to render
   */
  children: PropTypes.any,
}

Slider.defaultProps = {
  mode: 1,
  step: 0.1,
  domain: [0, 100],
  vertical: false,
  reversed: false,
  onChange: noop,
  onUpdate: noop,
  onSlideStart: noop,
  onSlideEnd: noop,
  disabled: false,
}

export default Slider
