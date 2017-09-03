// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider, { Knobs, Links, Ticks } from 'react-electric-slide'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Rail, Knob, Tick } from './components' // example render components - source below

// *******************************************************
// LINK COMPONENT
// *******************************************************
class Link extends Component {
  onMouseDown = e => {
    const { onMouse } = this.props
    onMouse(e)
  }

  onTouchStart = e => {
    const { onMouse } = this.props
    onMouse(e)
  }

  render() {
    const { source, target, scale } = this.props

    if (!source || !target) {
      return null
    }

    const p0 = scale(source.val)
    const p1 = scale(target.val)

    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: '#455a64',
          borderRadius: '6px',
          cursor: 'pointer',
          width: '8px',
          marginLeft: '-2px',
          top: `${p0}%`,
          height: `${p1 - p0}%`,
        }}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
      />
    )
  }
}

Link.propTypes = {
  source: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  target: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  scale: PropTypes.func,
  onMouse: PropTypes.func,
}

const defaultValues = [
  { key: 'cat', val: 450 },
  { key: 'hat', val: 400 },
  { key: 'dog', val: 300 },
  { key: 'bat', val: 150 },
]

class Example extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  render() {
    const { state: { values, update } } = this

    return (
      <div style={{ height: 520, width: '100%' }}>
        <ValueViewer values={values} update={update} />
        <Slider
          vertical
          rootStyle={{
            position: 'relative',
            height: '400px',
            marginLeft: '45%',
          }}
          mode={2}
          step={5}
          domain={[100, 500]}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          defaultValues={values}
        >
          <Rail />
          <Knobs>
            {({ knobs, scale, onMouse, onTouch }) => {
              return (
                <div>
                  {knobs.map((knob, index) => {
                    return (
                      <Knob
                        key={knob.key}
                        knob={knob}
                        index={index}
                        scale={scale}
                        onMouse={onMouse}
                        onTouch={onTouch}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Knobs>
          <Links>
            {({ links, scale, onMouse, onTouch }) => {
              return (
                <div>
                  {links.map((link, index) => {
                    return (
                      <Link
                        key={link.key}
                        source={link.source}
                        target={link.target}
                        index={index}
                        scale={scale}
                        onMouse={onMouse}
                        onTouch={onTouch}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Links>
          <Ticks>
            {({ scale }) => {
              const ticks = scale.ticks(10)

              return (
                <div>
                  {ticks.map(value => {
                    return (
                      <Tick
                        key={`tick-${value}`}
                        value={value}
                        scale={scale}
                        count={ticks.length}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default Example
