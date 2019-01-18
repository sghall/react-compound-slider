// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-compound-slider'
import { withStyles } from '@material-ui/core/styles'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Rail, Handle, Track } from './components' // example render components - source below

const style = () => ({
  root: {
    height: 120,
    width: '100%',
  },
  slider: {
    position: 'relative',
    width: '100%',
  },
})

const tooltipStyle = (percent, handleId, grabbed) => {
  return {
    left: `${percent}%`,
    position: 'absolute',
    zIndex: 3,
    width: 'auto',
    transform: 'translateX(-50%)',
    marginTop: '-45px',
    padding: '5px',
    height: 'auto',
    backgroundColor: 'rgb(10, 10, 10)',
    border: grabbed
      ? '1px solid white'
      : handleId
        ? '1px solid lightgrey'
        : '1px solid grey',
    userSelect: 'none',
  }
}

const domain = [100, 500]
const defaultValues = [150, 200]

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
      props: { classes },
      state: { values, update },
    } = this

    return (
      <div className={classes.root}>
        <ValueViewer values={values} update={update} />
        <Slider
          mode={(curr, next) => {
            const [{ val: val1 }, { val: val2 }] = next
            if (Math.abs(val1 - val2) > 100) {
              return curr
            }

            return next
          }}
          step={5}
          domain={domain}
          className={classes.slider}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Slider.Rail>
            {({ getRailProps }) => <Rail getRailProps={getRailProps} />}
          </Slider.Rail>
          <Slider.Tooltip>
            {({ tooltipInfo, getTooltipProps }) => (
              <div
                style={tooltipStyle(
                  tooltipInfo.percent,
                  tooltipInfo.handleId,
                  tooltipInfo.grabbed,
                )}
                {...getTooltipProps()}
              >
                {tooltipInfo.val}
              </div>
            )}
          </Slider.Tooltip>

          <Slider.Handles>
            {({ handles, getHandleProps }) => (
              <div>
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
          </Slider.Handles>
          <Slider.Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div>
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
          </Slider.Tracks>
        </Slider>
      </div>
    )
  }
}

Example.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(style)(Example)
