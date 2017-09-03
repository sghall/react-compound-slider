import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SliderTracks extends Component {
  render() {
    const { scale, values, emitMouse, emitTouch, children } = this.props
    const tracks = []

    for (let i = 0; i < values.length + 1; i++) {
      const s = values[i - 1]
      const t = values[i]

      tracks.push({
        key: `${s ? s.key : '$'}-${t ? t.key : '$'}`,
        source: s || null,
        target: t || null,
      })
    }

    const renderedChildren = children({
      scale,
      tracks,
      values,
      emitMouse,
      emitTouch,
    })

    return renderedChildren && React.Children.only(renderedChildren)
  }
}

SliderTracks.propTypes = {
  scale: PropTypes.func,
  values: PropTypes.array,
  children: PropTypes.func,
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
}

export default SliderTracks
