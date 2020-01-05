import React, { Fragment } from 'react';
import clsx from 'clsx';
import {
  GetRailProps,
  GetHandleProps,
  GetTrackProps,
  SliderItem,
} from 'react-compound-slider';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme } from '@material-ui/core/styles';

export type MuiClasses = { [key: string]: string };

// *******************************************************
// RAIL COMPONENT
// *******************************************************
const railStyle = () => ({
  common: {
    position: 'absolute' as 'absolute',
    width: '100%',
    transform: 'translate(0%, -50%)',
  },
  outer: {
    height: 42,
    borderRadius: 21,
    cursor: 'pointer',
    border: '1px solid white',
  },
  inner: {
    height: 4,
    borderRadius: 2,
    pointerEvents: 'none' as 'none',
    backgroundColor: 'rgb(155,155,155)',
  },
});

interface RailComponentProps {
  classes: MuiClasses;
  getRailProps: GetRailProps;
}

const RailComponent: React.FC<RailComponentProps> = ({
  classes,
  getRailProps,
}) => (
  <Fragment>
    <div className={clsx(classes.common, classes.outer)} {...getRailProps()} />
    <div className={clsx(classes.common, classes.inner)} />
  </Fragment>
);

export const SliderRail = withStyles(railStyle)(RailComponent);

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
const handleStyle = (theme: Theme) => {
  const colors = {
    primary: theme.palette.primary.main,
    thumbOutline: fade(theme.palette.primary.main, 0.16),
  };

  return {
    common: {
      position: 'absolute' as 'absolute',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    },
    outer: {
      zIndex: 5,
      width: 20,
      height: 40,
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      backgroundColor: 'none',
    },
    inner: {
      zIndex: 2,
      width: 12,
      height: 12,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: colors.primary,
    },
    active: {
      boxShadow: `0px 0px 0px 16px ${colors.thumbOutline}`,
    },
  };
};

interface HandleComponentProps {
  classes: MuiClasses;
  domain: number[];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
  disabled?: boolean;
  activeHandleID: string;
}

export const HandleComponent: React.FC<HandleComponentProps> = ({
  classes,
  domain: [min, max],
  handle: { id, value, percent },
  activeHandleID,
  getHandleProps,
}) => {
  const active = activeHandleID === id;

  return (
    <Fragment>
      <div
        className={clsx(classes.common, classes.outer)}
        style={{ left: `${percent}%` }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={clsx(
          classes.common,
          classes.inner,
          active && classes.active
        )}
        style={{ left: `${percent}%` }}
      />
    </Fragment>
  );
};

export const Handle = withStyles(handleStyle)(HandleComponent);

// *******************************************************
// TRACK COMPONENT
// *******************************************************
const trackStyle = (theme: Theme) => ({
  root: {
    position: 'absolute' as 'absolute',
    transform: 'translate(0%, -50%)',
    height: 4,
    zIndex: 1,
    borderRadius: 2,
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.dark,
  },
});

interface TrackComponentProps {
  classes: MuiClasses;
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  disabled?: boolean;
}

export const TrackComponent: React.FC<TrackComponentProps> = ({
  classes,
  source,
  target,
  getTrackProps,
}) => {
  return (
    <div
      className={classes.root}
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
};

export const Track = withStyles(trackStyle)(TrackComponent);

// *******************************************************
// TICK COMPONENT
// *******************************************************
const tickStyle = (theme: Theme) => ({
  tick: {
    position: 'absolute' as 'absolute',
    marginTop: 10,
    width: 1,
    height: 5,
    backgroundColor: theme.palette.text.primary,
  },
  label: {
    position: 'absolute' as 'absolute',
    marginTop: 16,
    textAlign: 'center' as 'center',
  },
});

interface TickComponentProps {
  classes: MuiClasses;
  tick: SliderItem;
  count: number;
  format?: (val: number) => string;
}

export const TickComponent: React.FC<TickComponentProps> = ({
  classes,
  tick,
  count,
  format = d => d,
}) => {
  return (
    <div>
      <div className={classes.tick} style={{ left: `${tick.percent}%` }} />
      <Typography
        variant="caption"
        className={classes.label}
        style={{
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </Typography>
    </div>
  );
};

export const Tick = withStyles(tickStyle)(TickComponent);
