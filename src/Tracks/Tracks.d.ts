import * as React from 'react';
import { SliderItem, GetEventData } from '..'

export interface TrackItem {
  id: string;
  source: SliderItem;
  target: SliderItem;
}

interface TrackEventHandlers {
  onMouseDown: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
}

export type GetTrackProps = () => TrackEventHandlers;

export interface TracksObject {
  tracks: Array<TrackItem>;
  activeHandleID: string;
  getEventData: GetEventData; 
  getTrackProps: GetTrackProps;
}

export interface TracksProps {
  left?: boolean;
  right?: boolean;
  children: (tracksObject: TracksObject) => React.ReactNode;
}

declare const Tracks: React.ComponentType<TracksProps>;

export default Tracks;
