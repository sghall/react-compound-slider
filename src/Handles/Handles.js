import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Handles extends Component {
  render() {
    const { children, handles, emitMouse, emitTouch } = this.props

    const renderedChildren = children({ handles, emitMouse, emitTouch })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Handles.propTypes = {
  handles: PropTypes.array,
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
  children: PropTypes.func,
}

export default Handles
