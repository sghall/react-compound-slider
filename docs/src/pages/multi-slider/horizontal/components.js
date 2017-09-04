// @flow weak

import React from 'react'
import PropTypes from 'prop-types'

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
        height: '8px',
        zIndex: 1,
        backgroundColor: '#455a64',
        borderRadius: '4px',
        cursor: 'pointer',
        left: `${p0}%`,
        width: `${p1 - p0}%`,
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
// HANDLE COMPONENT
// *******************************************************
export function Handle(props) {
  const {
    domain: [min, max],
    handle: { id, value, percent },
    emitMouse,
    emitTouch,
  } = props

  return (
    <div
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: '-11px',
        marginTop: '-9px',
        zIndex: 2,
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        borderRadius: '50%',
        border: 'solid 2px rgb(200,200,200)',
        backgroundColor: '#455a64',
      }}
      onMouseDown={e => emitMouse(e, id)}
      onTouchStart={e => emitTouch(e, id)}
    />
  )
}

Handle.propTypes = {
  domain: PropTypes.array,
  handle: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.number,
    percent: PropTypes.number,
  }),
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ value, count, scale, format }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: '14px',
          width: '1px',
          height: '5px',
          backgroundColor: 'rgb(200,200,200)',
          left: `${scale(value)}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: '22px',
          fontSize: '10px',
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${scale(value)}%`,
        }}
      >
        {format(value)}
      </div>
    </div>
  )
}

Tick.propTypes = {
  value: PropTypes.number,
  count: PropTypes.number,
  scale: PropTypes.func,
  format: PropTypes.func,
}

Tick.defaultProps = {
  format: d => d,
}
