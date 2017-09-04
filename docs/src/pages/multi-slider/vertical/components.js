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
        backgroundColor: '#455a64',
        borderRadius: '6px',
        cursor: 'pointer',
        width: '8px',
        marginLeft: '-2px',
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
          marginTop: '-0.5px',
          marginLeft: '10px',
          height: '1px',
          width: '6px',
          backgroundColor: 'rgb(200,200,200)',
          top: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: '-5px',
          marginLeft: '20px',
          fontSize: '10px',
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
