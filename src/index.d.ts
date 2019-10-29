import * as React from 'react';

export interface SliderItem {
  id: string;
  value: number;
  percent: number;
}

export interface EventData {
  value: number;
  percent: number;
}

export type GetEventData = (e: React.SyntheticEvent | Event) => EventData; 

export { default as Tracks, TrackItem, TracksObject, GetTrackProps, TracksProps } from './Tracks';
export { default as Ticks, TicksObject, TicksProps } from './Ticks';
export { default as Slider, SliderProps, SliderModeValue, SliderModeFunction } from './Slider';
export { default as Rail, GetRailProps, RailProps, RailObject } from './Rail';
export { default as Handles, HandlesObject, HandlesProps, GetHandleProps } from './Handles';