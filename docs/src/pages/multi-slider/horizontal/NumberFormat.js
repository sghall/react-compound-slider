// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import Slider, { Knobs, Links, Ticks } from 'react-electric-slide'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Rail, Knob, Link } from './components' // example render components - source below

const tickFormat = format('.2f')

// *******************************************************
// TICK COMPONENT W/ CUSTOM NUMBER FORMATTING
// *******************************************************
export function Tick({ value, scale, count }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: '14px',
          marginLeft: '-0.5px',
          width: '1px',
          height: '5px',
          backgroundColor: 'rgb(200,200,200)',
          left: `${scale(value)}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: '22px',
          fontSize: '10px',
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${scale(value)}%`,
        }}
      >
        {tickFormat(value)}
      </div>
    </div>
  )
}

Tick.propTypes = {
  value: PropTypes.number,
  scale: PropTypes.func,
  count: PropTypes.number,
}

const defaultValues = [
  { key: 'cat', val: 0.25 },
  { key: 'hat', val: 0.55 },
  { key: 'dog', val: 0.75 },
  { key: 'bat', val: 0.85 },
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
      <div style={{ height: 120, width: '100%' }}>
        <ValueViewer values={values} update={update} />
        <Slider
          rootStyle={{
            position: 'relative',
            width: '100%',
          }}
          mode={2}
          step={0.01}
          domain={[0, 1]}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          defaultValues={values}
        >
          <Rail />
          <Knobs>
            {({ knobs, scale, handleMouseDown, handleTouchStart }) => {
              return (
                <div className="slider-knobs">
                  {knobs.map((knob, index) => {
                    return (
                      <Knob
                        key={knob.key}
                        knob={knob}
                        index={index}
                        scale={scale}
                        handleMouseDown={handleMouseDown}
                        handleTouchStart={handleTouchStart}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Knobs>
          <Links>
            {({ links, scale }) => {
              return (
                <div className="slider-links">
                  {links.map((link, index) => {
                    return (
                      <Link
                        key={link.key}
                        source={link.source}
                        target={link.target}
                        index={index}
                        scale={scale}
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
                <div className="slider-links">
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
