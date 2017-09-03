// @flow weak

import React, { Component } from 'react'
import Slider, { Knobs, Links } from 'react-electric-slide'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Rail, Knob, Link, Tick } from './components' // example render components - source below

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
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '6px',
              marginTop: '-1px',
              borderRadius: '3px',
              backgroundColor: 'rgb(155,155,155)',
            }}
          />
          <Knobs>
            {({ knobs, scale, emitMouse, emitTouch }) => {
              const domain = scale.domain()

              return (
                <div>
                  {knobs.map((knob, index) => {
                    return (
                      <div
                        key={knob.key}
                        role="slider"
                        tabIndex={index}
                        aria-valuemin={domain[0]}
                        aria-valuemax={domain[1]}
                        aria-valuenow={knob.val}
                        style={{
                          left: `${scale(knob.val)}%`,
                          position: 'absolute',
                          marginLeft: '-11px',
                          marginTop: '-10px',
                          zIndex: 2,
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          borderRadius: '50%',
                          border: 'solid 2px rgb(200,200,200)',
                          backgroundColor: '#455a64',
                        }}
                        onMouseDown={e => emitMouse(e, knob.key)}
                        onTouchStart={e => emitTouch(e, knob.key)}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Knobs>
          <Links>
            {({ links, scale, emitMouse, emitTouch }) => {
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
                        emitMouse={emitMouse}
                        emitTouch={emitTouch}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Links>
          <Knobs>
            {({ scale }) => {
              const ticks = scale.ticks(20)

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
          </Knobs>
        </Slider>
      </div>
    )
  }
}

export default Example
