import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { callAll } from '../utils'

class Tracks extends Component {
  getTrackProps = (props = {}) => {
    const { emitMouse, emitTouch } = this.props

    return {
      ...props,
      onMouseDown: callAll(props.onMouseDown, emitMouse),
      onTouchStart: callAll(props.onTouchStart, emitTouch),
    }
  }

  render() {
    const {
      getTrackProps,
      props: {
        children,
        left,
        right,
        scale,
        handles,
        getEventData,
        activeHandleID,
      },
    } = this

    const domain = scale.getDomain()
    const tracks = []

    for (let i = 0; i < handles.length + 1; i++) {
      let source = handles[i - 1]
      let target = handles[i]

      if (i === 0 && left === true) {
        source = { id: '$', value: domain[0], percent: 0 }
      }
      if (i === handles.length && right === true) {
        target = { id: '$', value: domain[1], percent: 100 }
      }

      if (source && target) {
        tracks.push({
          id: `${source.id}-${target.id}`,
          source,
          target,
        })
      }
    }

    const renderedChildren = children({
      getEventData,
      activeHandleID,
      tracks,
      getTrackProps,
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
  getEventData: PropTypes.func,
  /** @ignore */
  activeHandleID: PropTypes.string,
  /** @ignore */
  scale: PropTypes.object,
  /** @ignore */
  handles: PropTypes.array,
  /** @ignore */
  emitMouse: PropTypes.func,
  /** @ignore */
  emitTouch: PropTypes.func,
  /**
   * A function to render the tracks. The function receives an object with an array of tracks. Note: `getEventData` can be called with an event and get the value and percent at that location (used for tooltips etc). `activeHandleID` will be a string or null.  Function signature:  `({ getEventData, activeHandleID, tracks, getTrackProps }): element`
   */
  children: PropTypes.func.isRequired,
}

Tracks.defaultProps = {
  left: true,
  right: true,
}

export default Tracks
