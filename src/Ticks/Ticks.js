import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Ticks extends Component {
  render() {
    const { children, values, scale, count, emitMouse, emitTouch } = this.props
    const ticks = (values ? values : scale.ticks(count)).map(value => {
      return {
        id: `$$-${value}`,
        value,
        percent: scale(value),
      }
    })

    const renderedChildren = children({ ticks, emitMouse, emitTouch })
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Ticks.propTypes = {
  scale: PropTypes.func,
  count: PropTypes.number,
  values: PropTypes.array,
  emitMouse: PropTypes.func,
  emitTouch: PropTypes.func,
  children: PropTypes.func,
}

Ticks.defaultProps = {
  count: 10,
}

export default Ticks
