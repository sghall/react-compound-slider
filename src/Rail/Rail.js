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
   * A function to render the rail content. 
   */
  children: PropTypes.func.isRequired,
}

export default Rail
