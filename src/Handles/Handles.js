import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { callAll } from '../utils'

class Handles extends Component {
  getHandleProps = (id, props = {}) => {
    const { emitMouse, emitTouch } = this.props

    return {
      ...props,
      onMouseDown: callAll(props.onMouseDown, e => emitMouse(e, id)),
      onTouchStart: callAll(props.onTouchStart, e => emitTouch(e, id)),
    }
  }

  render() {
    const { getHandleProps, props: { children, handles } } = this

    const renderedChildren = children({ handles, getHandleProps })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Handles.propTypes = {
  /** @ignore */
  handles: PropTypes.array,
  /** @ignore */
  emitMouse: PropTypes.func,
  /** @ignore */
  emitTouch: PropTypes.func,
  /**
   * A function to render the handles.
   * The function receives an object with an array of handles and functions to get handle props
   * `({ handles, getHandleProps }): element`
   */
  children: PropTypes.func.isRequired,
}

export default Handles
