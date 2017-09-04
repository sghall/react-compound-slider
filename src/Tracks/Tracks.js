import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tracks extends Component {
  render() {
    const { children, handles, emitMouse, emitTouch } = this.props

    const tracks = []

    for (let i = 0; i < handles.length + 1; i++) {
      const s = handles[i - 1]
      const t = handles[i]

      tracks.push({
        id: `${s ? s.id : '$'}-${t ? t.id : '$'}`,
        source: s || null,
        target: t || null,
      })
    }

    const renderedChildren = children({ tracks, emitMouse, emitTouch })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Tracks.propTypes = {
  handles: PropTypes.array,
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
  children: PropTypes.func,
}

export default Tracks
