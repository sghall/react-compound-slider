import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Ticks extends Component {
  render() {
    const { scale, knobs, children } = this.props

    const renderedChildren = children({ scale, knobs })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Ticks.propTypes = {
  scale: PropTypes.func,
  knobs: PropTypes.array,
  children: PropTypes.func,
}

export default Ticks
