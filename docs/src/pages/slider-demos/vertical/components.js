// @flow weak

import React from 'react'
import PropTypes from 'prop-types'

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  emitMouse,
  emitTouch,
}) {
  return (
    <div
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        top: `${percent}%`,
        position: 'absolute',
        marginLeft: -10,
        marginTop: -12,
        zIndex: 2,
        width: 24,
        height: 24,
        cursor: 'pointer',
        borderRadius: '50%',
        border: 'solid 2px rgb(200,200,200)',
        backgroundColor: '#ff3d00',
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
// TRACK COMPONENT
// *******************************************************
export function Track({ source, target, emitMouse, emitTouch }) {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#ff3d00',
        borderRadius: 6,
        cursor: 'pointer',
        width: 8,
        marginLeft: -2,
        top: `${source.percent}%`,
        height: `${target.percent - source.percent}%`,
      }}
      onMouseDown={e => emitMouse(e)}
      onTouchStart={e => emitTouch(e)}
    />
  )
}

Track.propTypes = {
  source: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  target: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
}

Track.defaultProps = {
  emitMouse: () => {},
  emitTouch: () => {},
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ tick, format }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: -0.5,
          marginLeft: 10,
          height: 1,
          width: 6,
          backgroundColor: 'rgb(200,200,200)',
          top: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: -5,
          marginLeft: 20,
          fontSize: 10,
          top: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  )
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.number,
    percent: PropTypes.number,
  }),
  format: PropTypes.func,
}

Tick.defaultProps = {
  format: d => d,
}
