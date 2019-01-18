// @flow weak

import React, { Component } from 'react'
import Slider, {
  Rail,
  Handles,
  Tracks,
  Ticks,
  Tooltip,
} from 'react-compound-slider'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Handle, Track, Tick } from './components' // example render components - source below

const sliderStyle = {
  position: 'relative',
  height: '400px',
  marginLeft: '45%',
}

const railStyle = {
  position: 'absolute',
  width: '14px',
  height: '100%',
  cursor: 'pointer',
  marginLeft: '-1px',
  borderRadius: '7px',
  backgroundColor: 'rgb(155,155,155)',
}

const tooltipStyle = percent => {
  return {
    top: `${percent}%`,
    position: 'absolute',
    zIndex: 3,
    //right: 0,    // stick it on left of slider.
    left: 0,
    marginLeft: '45px',
    width: 'auto',
    transform: 'translateY(-50%)',
    padding: '5px',
    height: 'auto',
    backgroundColor: 'rgb(10, 10, 10)',
    border: '1px solid white',
  }
}

const domain = [100, 300]
const defaultValues = [250, 200, 150, 100]

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
    const {
      state: { values, update },
    } = this

    return (
      <div style={{ height: 520, width: '100%' }}>
        <ValueViewer values={values} update={update} />
        <Slider
          vertical
          reversed
          mode={3}
          step={10}
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
                style={tooltipStyle(tooltipInfo.percent)}
                {...getTooltipProps()}
              >
                {tooltipInfo.val}
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
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={10}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default Example
