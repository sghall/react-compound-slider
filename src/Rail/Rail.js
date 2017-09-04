import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Rail extends Component {
  render() {
    const { children, emitMouse, emitTouch } = this.props

    const renderedChildren = children({ emitMouse, emitTouch })
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
