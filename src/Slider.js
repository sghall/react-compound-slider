import React, { PureComponent } from 'react'
import warning from 'warning'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import scaleLinear from 'd3-scale/src/linear'
import scaleQuantize from 'd3-scale/src/quantize'
import { mode1, mode2 } from './modes'
import * as utils from './utils'

function noop() {}

class Slider extends PureComponent {
  constructor(props) {
    super(props)

    this.slider = null
    this.handles = {}

    this.valueToPerc = scaleLinear()
    this.valueToStep = scaleQuantize()
    this.pixelToStep = scaleQuantize()

    this.state = { values: [] }

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onMove = this.onMove.bind(this)

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onStart = this.onStart.bind(this)

    this.onMouseUp = this.onMouseUp.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
  }

  componentWillMount() {
    const { domain: [min, max], defaultValues, step } = this.props
    const range = utils.getStepRange(min, max, step)

    this.valueToStep
      .range(range.slice())
      .domain([min - step / 2, max + step / 2])

    if (reversed === true) {
      this.valueToPerc.domain([min, max]).range([100, 0])
      range.reverse()
    } else {
      this.valueToPerc.domain([min, max]).range([0, 100])
    }

    warning(
      max > min,
      `React Electric Slide: Max must be greater than min (even if reversed). Max is ${max}. Min is ${min}.`,
    )

    warning(
      range.length <= 10001,
      `React Electric Slide: Increase step value. Found ${range.length.toLocaleString()} values in range.`,
    )

    const last = range.length - 1

    warning(
      range[reversed ? last : 0] === min && range[reversed ? 0 : last] === max,
      `React Electric Slide: The range is incorrectly calculated. Check domain (min, max) and step values.`,
    )

    this.pixelToStep.range(range)

    this.setState(() => {
      const values = []
      const pushed = {}

      const cloned = defaultValues
        .map(({ key, val }) => ({ key, val }))
        .sort(utils.getSortByVal(reversed))

      cloned.forEach(({ key, val }) => {
        const v0 = this.valueToStep(val)

        warning(
          v0 === val,
          `React Electric Slide: Invalid default value. Changing ${val} to ${v0}.`,
        )

        warning(
          !pushed[key],
          `React Electric Slide: No duplicate keys allowed. Skipping "${key}" key.`,
        )

        if (!pushed[key]) {
          pushed[key] = true
          values.push({ key, val: v0 })
        }
      })

      return { values }
    })
  }

  onMouseDown(e) {
    this.onStart(e, false)
  }

  onTouchStart(e) {
    if (utils.isNotValidTouch(e)) {
      return
    }
    this.onStart(e, true)
  }

  onStart(e, isTouch) {
    const { handles } = this

    e.stopPropagation()
    e.preventDefault()

    const active = Object.keys(handles).find(key => {
      return e.target === handles[key].node
    })

    if (active) {
      this.active = active
      isTouch ? this.addTouchEvents() : this.addMouseEvents()
    }
  }

  addMouseEvents() {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  addTouchEvents() {
    document.addEventListener('touchmove', this.onTouchMove)
    document.addEventListener('touchend', this.onTouchEnd)
  }

  onMouseMove(e) {
    const { state: { values: prev }, props: { vertical, reversed } } = this
    const { active, slider } = this

    this.pixelToStep.domain(utils.getSliderDomain(slider, vertical))

    const step = this.pixelToStep(vertical ? e.clientY : e.pageX)
    const next = utils.updateValues(prev, active, step, reversed)

    this.onMove(prev, next)
  }

  onTouchMove(e) {
    const { state: { values: prev }, props: { vertical, reversed } } = this
    const { active, slider } = this

    if (utils.isNotValidTouch(e)) {
      return
    }

    this.pixelToStep.domain(utils.getSliderDomain(slider, vertical))

    const step = this.pixelToStep(utils.getTouchPosition(vertical, e))
    const next = utils.updateValues(prev, active, step, reversed)

    this.onMove(prev, next)
  }

  onMove(prev, next) {
    const { mode, onUpdate } = this.props

    if (next !== prev) {
      let values

      switch (mode) {
        case 1:
          values = mode1(prev, next)
          break
        case 2:
          values = mode2(prev, next)
          break
        default:
          values = next
          warning(false, 'React Electric Slide: Invalid mode value.')
      }

      onUpdate(values)
      this.setState({ values })
    }
  }

  onMouseUp() {
    const { state: { values }, props: { onChange } } = this
    onChange(values)

    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  onTouchEnd() {
    const { state: { values }, props: { onChange } } = this
    onChange(values)

    document.removeEventListener('touchmove', this.onTouchMove)
    document.removeEventListener('touchend', this.onTouchEnd)
  }

  saveHandle(key, node) {
    this.handles[key] = { key, node: findDOMNode(node) }
  }

  render() {
    const {
      vertical,
      disabled,
      className,
      rootStyle,
      knobComponent,
      railComponent,
      linkComponent,
      tickComponent,
    } = this.props

    const values = this.state.values

    const ticks = this.valueToPerc.ticks()
    let links = null

    if (linkComponent) {
      links = []

      for (let i = 0; i < values.length + 1; i++) {
        const s = values[i - 1]
        const t = values[i]

        links.push(
          React.cloneElement(linkComponent, {
            key: `${s ? s.key : '$'}-${t ? t.key : '$'}`,
            index: i,
            count: values.length,
            scale: this.valueToPerc,
            source: s || null,
            target: t || null,
          }),
        )
      }
    }

    return React.createElement(
      'div',
      {
        style: rootStyle || {},
        className,
        ref: node => (this.slider = node),
        onTouchStart: disabled ? noop : this.onTouchStart,
        onMouseDown: disabled ? noop : this.onMouseDown,
      },
      React.cloneElement(railComponent, { vertical, disabled }),
      links,
      values.map(({ key, val: value }, index) =>
        React.cloneElement(knobComponent, {
          ref: node => this.saveHandle(key, node),
          key,
          index,
          value,
          scale: this.valueToPerc,
        }),
      ),
      ticks.map((value, index) =>
        React.cloneElement(tickComponent, {
          key: `key-${value}`,
          value,
          index,
          count: values.length,
          scale: this.valueToPerc,
        }),
      ),
    )
  }
}

Slider.propTypes = {
  step: PropTypes.number.isRequired,
  mode: PropTypes.oneOf([1, 2]).isRequired,
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  vertical: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  rootStyle: PropTypes.object,
  knobComponent: PropTypes.element,
  linkComponent: PropTypes.element,
  railComponent: PropTypes.element,
  tickComponent: PropTypes.element,
  defaultValues: PropTypes.arrayOf(PropTypes.object).isRequired,
}

Slider.defaultProps = {
  mode: 1,
  step: 0.1,
  vertical: false,
  disabled: false,
  reversed: false,
  onUpdate: noop,
  onChange: noop,
}

export default Slider
