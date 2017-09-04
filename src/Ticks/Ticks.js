import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Ticks extends Component {
  render() {
    const { children, values, scale, count, emitMouse, emitTouch } = this.props
    const ticks = (values ? values : scale.ticks(count)).map(value => {
      return {
        id: `$$-${value}`,
        value,
        percent: scale(value),
      }
    })

    const renderedChildren = children({ ticks, emitMouse, emitTouch })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Ticks.propTypes = {
  /**
   * The backgroundColor of the avatar. Does not apply to image avatars.
   */
  scale: PropTypes.func,
  /**
   * The backgroundColor of the avatar. Does not apply to image avatars.
   */
  count: PropTypes.number,
  /**
   * The backgroundColor of the avatar. Does not apply to image avatars.
   */
  values: PropTypes.array,
  /**
   * The backgroundColor of the avatar. Does not apply to image avatars.
   */
  emitMouse: PropTypes.func,
  /**
   * The backgroundColor of the avatar. Does not apply to image avatars.
   */
  emitTouch: PropTypes.func,
  /**
   * The backgroundColor of the avatar. Does not apply to image avatars.
   */
  children: PropTypes.func,
}

Ticks.defaultProps = {
  count: 10,
}

export default Ticks
