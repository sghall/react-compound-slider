import React, { Component } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { withStyles } from '@material-ui/core/styles';
import ValueViewer from '../ValueViewer';
import { SliderRail, Handle, Track, MuiClasses } from './components';

const style = () => ({
  root: {
    height: 120,
    width: '100%',
  },
  slider: {
    position: 'relative' as 'relative',
    width: '100%',
  },
});

const domain = [100, 500];
const defaultValues = [150];

interface ExampleProps {
  classes: MuiClasses;
}

interface ExampleState {
  values: ReadonlyArray<number>;
  update: ReadonlyArray<number>;
}

class Example extends Component<ExampleProps, ExampleState> {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  };

  onUpdate = (update: ReadonlyArray<number>) => {
    this.setState({ update });
  };

  onChange = (values: ReadonlyArray<number>) => {
    this.setState({ values });
  };

  render() {
    const {
      props: { classes },
      state: { values, update },
    } = this;

    return (
      <div className={classes.root}>
        <ValueViewer values={values} update={update} />
        <Slider
          mode={2}
          step={5}
          domain={domain}
          className={classes.slider}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ activeHandleID, handles, getHandleProps }) => (
              <div>
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    activeHandleID={activeHandleID}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
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
          </Tracks>
        </Slider>
      </div>
    );
  }
}

export const Example1 = withStyles(style)(Example);
