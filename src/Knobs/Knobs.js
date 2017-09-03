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
  knobs: PropTypes.array,
  onMouse: PropTypes.func,
  onTouch: PropTypes.func,
  children: PropTypes.func,
}

export default Knobs
