import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { callAll } from '../utils'

class Rail extends Component {
  getRailProps = (props = {}) => {
    const { emitMouse, emitTouch } = this.props

    return {
      ...props,
      onMouseDown: callAll(props.onMouseDown, emitMouse),
      onTouchStart: callAll(props.onTouchStart, emitTouch),
    }
  }

  render() {
    const { getRailProps, props: { children } } = this

    const renderedChildren = children({ getRailProps })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Rail.propTypes = {
  /** @ignore */
  emitMouse: PropTypes.func,
  /** @ignore */
  emitTouch: PropTypes.func,
  /**
   * A function to render to the rail. Functions for emitting events. `({ emitMouse, emitTouch }): element`
   */
  children: PropTypes.func.isRequired,
}

export default Rail
