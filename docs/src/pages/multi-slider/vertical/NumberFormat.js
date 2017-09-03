// @flow weak

import React, { Component } from 'react'
import { format } from 'd3-format'
import Slider, { Knobs, Links, Ticks } from 'react-electric-slide'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Rail, Knob, Link, Tick } from './components' // example render components - source below

const tickFormat = format('.2f')

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
      <div style={{ height: 520, width: '100%' }}>
        <ValueViewer values={values} update={update} format={tickFormat} />
        <Slider
          vertical
          rootStyle={{
            position: 'relative',
            height: '400px',
            marginLeft: '45%',
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
            {({ links, scale }) => {
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
                        format={tickFormat}
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
