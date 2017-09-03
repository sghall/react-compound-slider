// @flow weak

import React from 'react'
import PropTypes from 'prop-types'

// *******************************************************
// RAIL COMPONENT
// *******************************************************
export function Rail({ emitMouse, emitTouch }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '6px',
        height: '100%',
        marginLeft: '-1px',
        borderRadius: '3px',
        backgroundColor: 'rgb(155,155,155)',
      }}
      onMouseDown={e => emitMouse(e)}
      onTouchStart={e => emitTouch(e)}
    />
  )
}

Rail.propTypes = {
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
}

// *******************************************************
// LINK COMPONENT
// *******************************************************
export function Link(props) {
  const { source, target, scale, emitMouse, emitTouch } = props

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
        cursor: 'pointer',
        width: '8px',
        marginLeft: '-2px',
        top: `${p0}%`,
        height: `${p1 - p0}%`,
      }}
      onMouseDown={e => emitMouse(e)}
      onTouchStart={e => emitTouch(e)}
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
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
}

Link.defaultProps = {
  emitMouse: () => {},
  emitTouch: () => {},
}

// *******************************************************
// KNOB COMPONENT
// *******************************************************
export function Knob(props) {
  const { knob: { key, val }, index, scale, emitMouse, emitTouch } = props
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
      onMouseDown={e => emitMouse(e, key)}
      onTouchStart={e => emitTouch(e, key)}
    />
  )
}

Knob.propTypes = {
  knob: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  scale: PropTypes.func,
  index: PropTypes.number,
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
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
