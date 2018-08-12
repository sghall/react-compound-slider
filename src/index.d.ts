import * as React from 'react';

export interface SliderItem {
  id: string;
  value: number;
  percent: number;
}

export { default as Tracks, TrackItem, TracksObject, GetTrackProps } from './Tracks';
export { default as Ticks, TicksObject } from './Ticks';
export { default as Slider } from './Slider';
export { default as Rail, GetRailProps } from './Rail';
export { default as Handles, HandlesObject, GetHandleProps } from './Handles';