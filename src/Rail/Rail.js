import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Rail extends Component {
  render() {
    const { children, ...rest } = this.props

    const renderedChildren = children({ ...rest })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Rail.propTypes = {
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
  children: PropTypes.func,
}

export default Rail
