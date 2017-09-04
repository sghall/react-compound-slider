// @flow weak

import React from 'react'
import PropTypes from 'prop-types'

// *******************************************************
// LINK COMPONENT
// *******************************************************
export function Track({ source, target, emitMouse, emitTouch }) {
  if (!source || !target) {
    return null
  }

  return (
    <div
      style={{
        position: 'absolute',
        height: '8px',
        zIndex: 1,
        backgroundColor: '#455a64',
        borderRadius: '4px',
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
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
export function Tick({ tick, count, format }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: '14px',
          width: '1px',
          height: '5px',
          backgroundColor: 'rgb(200,200,200)',
          left: `${tick.percent}%`,
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
          left: `${tick.percent}%`,
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
  count: PropTypes.number,
  format: PropTypes.func,
}

Tick.defaultProps = {
  format: d => d,
}
