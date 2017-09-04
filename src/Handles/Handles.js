import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Handles extends Component {
  render() {
    const { children, scale, knobs: values, ...rest } = this.props

    const handles = values.map(({ key, val }) => {
      return { id: key, value: val, percent: scale(val) }
    })

    const renderedChildren = children({ handles, ...rest })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Handles.propTypes = {
  scale: PropTypes.func,
  knobs: PropTypes.array,
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
  children: PropTypes.func,
}

export default Handles
