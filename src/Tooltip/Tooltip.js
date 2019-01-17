import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { callAll } from '../utils'

class Tooltip extends Component {
  getTooltipProps = (props = {}) => {
    const { emitMouse, emitTouch } = this.props

    return {
      ...props,
      onMouseDown: callAll(props.onMouseDown, emitMouse),
      onTouchStart: callAll(props.onTouchStart, emitTouch),
    }
  }

  render() {
    const {
      getTooltipProps,
      props: { children },
    } = this

    const renderedChildren = children({ getTooltipProps })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Tooltip.propTypes = {
  /** @ignore */
  emitMouse: PropTypes.func,
  /** @ignore */
  emitTouch: PropTypes.func,
  /**
   * A function to render the tooltip. `({ getTooltipProps }): element`
   */
  children: PropTypes.func.isRequired,
}

export default Tooltip
