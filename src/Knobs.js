import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Knobs extends Component {
  render() {
    const { children, ...rest } = this.props

    const renderedChildren = children({ ...rest })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Knobs.propTypes = {
  scale: PropTypes.func,
  values: PropTypes.array,
  handleMouseDown: PropTypes.func,
  handleTouchStart: PropTypes.func,
  children: PropTypes.func,
}

export default Knobs
