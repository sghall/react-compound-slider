import React, { Component } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import ValueViewer from '../ValueViewer';
import { SliderRail, Handle, Track } from './components';

const sliderStyle = {
  position: 'relative' as 'relative',
  width: '100%',
};

const domain = [100, 500];
const defaultValues = [200];

interface SliderState {
  values: ReadonlyArray<number>;
  update: ReadonlyArray<number>;
  disabled: boolean;
}

export class Example6 extends Component<{}, SliderState> {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
    disabled: false,
  };

  onUpdate = (update: ReadonlyArray<number>) => {
    this.setState({ update });
  };

  onChange = (values: ReadonlyArray<number>) => {
    this.setState({ values });
  };

  toggleDisabled = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  render() {
    const {
      state: { values, update, disabled },
    } = this;

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
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
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
    );
  }
}
