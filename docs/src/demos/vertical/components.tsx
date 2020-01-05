import * as React from 'react';
import {
  GetRailProps,
  GetHandleProps,
  GetTrackProps,
  SliderItem,
} from 'react-compound-slider';

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: 'absolute' as 'absolute',
  height: '100%',
  width: 42,
  transform: 'translate(-50%, 0%)',
  borderRadius: 7,
  cursor: 'pointer',
};

const railInnerStyle = {
  position: 'absolute' as 'absolute',
  height: '100%',
  width: 14,
  transform: 'translate(-50%, 0%)',
  borderRadius: 7,
  pointerEvents: 'none' as 'none',
  backgroundColor: 'rgb(155,155,155)',
};

interface SliderRailProps {
  getRailProps: GetRailProps;
}

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => {
  return (
    <>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </>
  );
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
interface HandleProps {
  domain: number[];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
}

export const Handle: React.FC<HandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
}) => {
  return (
    <>
      <div
        style={{
          top: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 42,
          height: 28,
          cursor: 'pointer',
          backgroundColor: 'none',
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          top: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 24,
          height: 24,
          borderRadius: '50%',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#D7897E',
        }}
      />
    </>
  );
};

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export const KeyboardHandle: React.FC<HandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
}) => {
  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        top: `${percent}%`,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        width: 24,
        height: 24,
        zIndex: 5,
        cursor: 'pointer',
        border: 0,
        borderRadius: '50%',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#D7897E',
      }}
      {...getHandleProps(id)}
    />
  );
};

// *******************************************************
// TRACK COMPONENT
// *******************************************************
interface TrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  disabled?: boolean;
}

export const Track: React.FC<TrackProps> = ({
  source,
  target,
  getTrackProps,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#C55F4E',
        borderRadius: 7,
        cursor: 'pointer',
        width: 14,
        transform: 'translate(-50%, 0%)',
        top: `${source.percent}%`,
        height: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
interface TickProps {
  tick: SliderItem;
  format?: (val: number) => string;
}

export const Tick: React.FC<TickProps> = ({ tick, format = d => d }) => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: -0.5,
          marginLeft: 10,
          height: 1,
          width: 6,
          backgroundColor: 'rgb(200,200,200)',
          top: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: -5,
          marginLeft: 20,
          fontSize: 10,
          top: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
};
