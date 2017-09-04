import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tracks extends Component {
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

    const renderedChildren = children({ tracks, emitMouse, emitTouch })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Tracks.propTypes = {
  left: PropTypes.bool,
  right: PropTypes.bool,
  scale: PropTypes.func,
  handles: PropTypes.array,
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
  children: PropTypes.func,
}

Tracks.defaultProps = {
  left: true,
  right: true,
}

export default Tracks
