import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Ticks extends Component {
  render() {
    const { children, ...rest } = this.props

    const renderedChildren = children({ ...rest })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Ticks.propTypes = {
  scale: PropTypes.func,
  knobs: PropTypes.array,
  children: PropTypes.func,
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
}

export default Ticks
