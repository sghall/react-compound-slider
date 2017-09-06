import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { callAll } from '../utils'

class Rail extends Component {
  getRailProps = (props = {}) => ({
    ...props,
    onMouseDown: callAll(props.onMouseDown, this.emitMouse),
    onTouchStart: callAll(props.onTouchStart, this.emitTouch),
  })

  emitMouse = e => {
    this.props.emitMouse(e)
  }

  emitTouch = e => {
    this.props.emitTouch(e)
  }

  render() {
    const { children, emitMouse, emitTouch } = this.props

    const renderedChildren = children({
      emitMouse,
      emitTouch,
      getRailProps: this.getRailProps,
    })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Rail.propTypes = {
  /** @ignore */
  emitMouse: PropTypes.func,
  /** @ignore */
  emitTouch: PropTypes.func,
  /**
   * A function to render to the rail. Functions for emitting events. `({ emitMouse, emitTouch }): element`
   */
  children: PropTypes.func.isRequired,
}

export default Rail
