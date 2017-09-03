import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Links extends Component {
  render() {
    const { scale, knobs, onMouse, onTouch, children } = this.props
    const links = []

    for (let i = 0; i < knobs.length + 1; i++) {
      const s = knobs[i - 1]
      const t = knobs[i]

      links.push({
        key: `${s ? s.key : '$'}-${t ? t.key : '$'}`,
        source: s || null,
        target: t || null,
      })
    }

    const renderedChildren = children({
      links,
      scale,
      knobs,
      onMouse,
      onTouch,
    })

    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Links.propTypes = {
  scale: PropTypes.func,
  knobs: PropTypes.array,
  onMouse: PropTypes.func,
  onTouch: PropTypes.func,
  children: PropTypes.func,
}

export default Links
