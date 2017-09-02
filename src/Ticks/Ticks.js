import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Ticks extends Component {
  render() {
    const { scale, values, children } = this.props

    const renderedChildren = children({ scale, knobs: values })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Ticks.propTypes = {
  scale: PropTypes.func,
  values: PropTypes.array,
  children: PropTypes.func,
}

export default Ticks
