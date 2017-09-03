// @flow weak

import React, { Component } from 'react'
import Slider, { SliderItems, Links } from 'react-electric-slide'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Rail, Handle, Link, Tick } from './components' // example render components - source below

const defaultValues = [450, 400, 300, 150]

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
          <SliderItems>
            {({ emitMouse, emitTouch }) => (
              <Rail emitMouse={emitMouse} emitTouch={emitTouch} />
            )}
          </SliderItems>
          <SliderItems>
            {({ handles, scale, emitMouse, emitTouch }) => (
              <div>
                {handles.map((handle, index) => (
                  <Handle
                    key={handle.key}
                    index={index}
                    scale={scale}
                    handle={handle}
                    emitMouse={emitMouse}
                    emitTouch={emitTouch}
                  />
                ))}
              </div>
            )}
          </SliderItems>
          <Links>
            {({ links, scale, emitMouse, emitTouch }) => (
              <div>
                {links.map(({ key, source, target }, index) => (
                  <Link
                    key={key}
                    source={source}
                    target={target}
                    index={index}
                    scale={scale}
                    emitMouse={emitMouse}
                    emitTouch={emitTouch}
                  />
                ))}
              </div>
            )}
          </Links>
          <SliderItems>
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
          </SliderItems>
        </Slider>
      </div>
    )
  }
}

export default Example
