import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { callAll } from '../utils'

class Tracks extends Component {
  getTrackProps = (props = {}) => ({
    ...props,
    onMouseDown: callAll(props.onMouseDown, this.emitMouse),
    onTouchStart: callAll(props.onTouchStart, this.emitTouch),
  })

  emitMouse = e => {
    this.props.emitMouse(e)
  }

  emitTouch = e => {
    this.props.emitTouch(e)
  }

  render() {
    const {
      children,
      left,
      right,
      scale,
      handles,
      emitMouse,
      emitTouch,
    } = this.props
    const domain = scale.domain()
    const tracks = []

    for (let i = 0; i < handles.length + 1; i++) {
      let s = handles[i - 1]
      let t = handles[i]

      if (i === 0 && left === true) {
        s = { id: '$', value: domain[0], percent: 0 }
      } else if (i === handles.length && right === true) {
        t = { id: '$', value: domain[1], percent: 100 }
      }

      if (s && t) {
        tracks.push({
          id: `${s.id}-${t.id}`,
          source: s,
          target: t,
        })
      }
    }

    const renderedChildren = children({
      tracks,
      emitMouse,
      emitTouch,
      getTrackProps: this.getTrackProps,
    })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Tracks.propTypes = {
  /**
   * Boolean value to control whether the left most track is included in the tracks array.
   */
  left: PropTypes.bool,
  /**
   * Boolean value to control whether the right most track is included in the tracks array.
   */
  right: PropTypes.bool,
  /** @ignore */
  scale: PropTypes.func,
  /** @ignore */
  handles: PropTypes.array,
  /** @ignore */
  emitMouse: PropTypes.func,
  /** @ignore */
  emitTouch: PropTypes.func,
  /**
   * A function to render to the tracks. The function receives and object with an array of tracks and functions for emitting events. `({ tracks, emitMouse, emitTouch }): element`
   */
  children: PropTypes.func.isRequired,
}

Tracks.defaultProps = {
  left: true,
  right: true,
}

export default Tracks
