// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// *******************************************************
// RAIL COMPONENT
// *******************************************************
export function Rail() {
  return (
    <div
      style={{
        position: 'absolute',
        width: '4px',
        height: '100%',
        borderRadius: '2px',
        backgroundColor: 'rgb(155,155,155)',
      }}
    />
  )
}

// *******************************************************
// LINK COMPONENT
// *******************************************************
export function Link({ source, target, scale }) {
  if (!source || !target) {
    return null
  }

  const p0 = scale(source.val)
  const p1 = scale(target.val)

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#455a64',
        borderRadius: '6px',
        width: '8px',
        marginLeft: '-2px',
        top: `${p0}%`,
        height: `${p1 - p0}%`,
      }}
    />
  )
}

Link.propTypes = {
  source: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  target: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  scale: PropTypes.func,
}

// *******************************************************
// KNOB COMPONENT
// *******************************************************
export class Knob extends Component {
  onMouseDown = e => {
    const { handleMouseDown, knob: { key } } = this.props
    handleMouseDown(e, key)
  }

  onTouchStart = e => {
    const { handleTouchStart, knob: { key } } = this.props
    handleTouchStart(e, key)
  }

  render() {
    const { knob: { val }, index, scale } = this.props
    const domain = scale.domain()

    return (
      <div
        role="slider"
        tabIndex={index}
        aria-valuemin={domain[0]}
        aria-valuemax={domain[1]}
        aria-valuenow={val}
        style={{
          top: `${scale(val)}%`,
          position: 'absolute',
          marginLeft: '-10px',
          marginTop: '-12px',
          zIndex: 2,
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          borderRadius: '50%',
          border: 'solid 2px rgb(200,200,200)',
          backgroundColor: '#455a64',
        }}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
      />
    )
  }
}

Knob.propTypes = {
  knob: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  scale: PropTypes.func,
  index: PropTypes.number,
  handleMouseDown: PropTypes.func,
  handleTouchStart: PropTypes.func,
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ value, scale, format }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: '-0.5px',
          marginLeft: '10px',
          height: '1px',
          width: '6px',
          backgroundColor: 'rgb(200,200,200)',
          top: `${scale(value)}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: '-5px',
          marginLeft: '20px',
          fontSize: '10px',
          top: `${scale(value)}%`,
        }}
      >
        {format(value)}
      </div>
    </div>
  )
}

Tick.propTypes = {
  value: PropTypes.number,
  scale: PropTypes.func,
  format: PropTypes.func,
}

Tick.defaultProps = {
  format: d => d,
}
