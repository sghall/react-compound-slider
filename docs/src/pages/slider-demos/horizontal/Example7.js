// @flow weak

import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks, Tooltip } from 'react-compound-slider'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Handle, Track } from './components' // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: 'rgb(155,155,155)',
}

const tooltipStyle = percent => {
  return {
    left: `${percent}%`,
    position: 'absolute',
    width: 'auto',
    marginTop: '-40px',
    padding: '5px',
    height: 'auto',
    backgroundColor: 'rgb(10, 10, 10)',
    border: '1px solid white',
  }
}

const domain = [50, 300]
const defaultValues = [280]

class Example extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
    disabled: false,
  }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  toggleDisabled = () => {
    this.setState({ disabled: !this.state.disabled })
  }

  render() {
    const {
      state: { values, update, disabled },
    } = this

    return (
      <div style={{ height: 120, width: '100%' }}>
        <button onClick={() => this.toggleDisabled()}>
          {disabled ? 'ENABLE' : 'DISABLE'}
        </button>

        <ValueViewer values={values} update={update} />
        <Slider
          disabled={disabled}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
          <Tooltip>
            {({ tooltipInfo, getTooltipProps }) => (
              <div
                style={tooltipStyle(tooltipInfo ? tooltipInfo.percent : null)}
                {...getTooltipProps()}
              >
                {tooltipInfo ? tooltipInfo.val : 'zilcho'}
              </div>
            )}
          </Tooltip>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                    disabled={disabled}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                    disabled={disabled}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    )
  }
}

export default Example
