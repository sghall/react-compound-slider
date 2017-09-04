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
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
  children: PropTypes.func,
}

export default Rail
