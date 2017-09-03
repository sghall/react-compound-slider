import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SliderItems extends Component {
  render() {
    const { children, knobs: handles, ...rest } = this.props

    const renderedChildren = children({ handles, ...rest })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

SliderItems.propTypes = {
  scale: PropTypes.func,
  knobs: PropTypes.array,
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
  children: PropTypes.func,
}

export default SliderItems
