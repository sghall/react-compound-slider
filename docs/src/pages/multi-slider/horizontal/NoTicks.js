// @flow weak

import React, { Component } from 'react'
import Slider, { Knobs, Links } from 'react-electric-slide'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Rail, Knob, Link } from './components' // example render components - source below

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
      <div style={{ height: 120, width: '100%' }}>
        <ValueViewer values={values} update={update} />
        <Slider
          rootStyle={{
            position: 'relative',
            width: '100%',
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
        </Slider>
      </div>
    )
  }
}

export default Example
