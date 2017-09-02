// @flow weak

import React, { Component } from 'react'
import Slider from 'react-electric-slide'
import ValueViewer from '../ValueViewer'

// *******************************************************
// RAIL COMPONENT
// *******************************************************
const Rail = ({ vertical }) => (
  <div
    style={{
      position: 'absolute',
      width: vertical ? '4px' : '100%',
      height: vertical ? '100%' : '4px',
      borderRadius: '2px',
      backgroundColor: 'rgb(155,155,155)',
    }}
  />
)

// *******************************************************
// LINK COMPONENT
// *******************************************************
const Link = ({ source, target, index, scale }) => {
  if (!source) {
    return null
  }

  const p1 = scale(source.val)

  return (
    <div
      style={{
        position: 'absolute',
        width: '8px',
        marginLeft: '-2px',
        zIndex: 1,
        backgroundColor: '#455a64',
        borderRadius: '6px',
        bottom: '0%',
        height: `${100 - p1}%`,
      }}
    />
  )
}

// *******************************************************
// KNOB COMPONENT (must be a component not a SFC!)
// *******************************************************
class Knob extends Component {
  render() {
    const { value, index, scale, vertical } = this.props
    const domain = scale.domain()

    return (
      <div
        role="slider"
        tabIndex={index}
        aria-valuemin={domain[0]}
        aria-valuemax={domain[1]}
        aria-valuenow={value}
        style={{
          top: `${scale(value)}%`,
          position: 'absolute',
          marginLeft: '-10px',
          marginTop: '-12px',
          zIndex: 2,
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          borderRadius: '50%',
          border: 'solid 4px rgb(200,200,200)',
          backgroundColor: '#455a64',
        }}
      />
    )
  }
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
const Tick = ({ value, index, count, scale }) => {
  const domain = scale.domain()

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: '-0.5px',
          marginLeft: '10px',
          height: '1px',
          width: '6px',
          backgroundColor: 'rgb(200,200,200)',
          top: `${scale(value)}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: '-5px',
          marginLeft: '20px',
          fontSize: '10px',
          top: `${scale(value)}%`,
        }}
      >
        {value}
      </div>
    </div>
  )
}

// *******************************************************
// SLIDER EXAMPLE
// *******************************************************
const defaultValues = [{ key: 'cat', val: 450 }]

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
    const { state: { values, update }, props: { classes } } = this

    return (
      <div style={{ height: 520, width: '100%' }}>
        <ValueViewer values={values} update={update} />
        <Slider
          vertical
          reversed
          rootStyle={{
            position: 'relative',
            height: '400px',
            marginLeft: '45%',
          }}
          mode={2}
          step={10}
          domain={[100, 500]}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          defaultValues={values}
          knobComponent={<Knob />}
          linkComponent={<Link />}
          railComponent={<Rail />}
          tickComponent={<Tick />}
        />
      </div>
    )
  }
}

export default Example
