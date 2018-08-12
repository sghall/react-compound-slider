import * as React from 'react';
import { SliderItem } from '..'

export interface TrackItem {
  id: string;
  source: SliderItem;
  target: SliderItem;
}

interface TrackEventHandlers {
  onMouseDown: () => void;
  onTouchStart: () => void;
}

export type GetTrackProps = () => TrackEventHandlers;

export interface TracksObject {
  tracks: Array<TrackItem>;
  getTrackProps: GetTrackProps;
}

export interface TracksProps {
  left?: boolean;
  right?: boolean;
  children: (tracksObject: TracksObject) => React.ReactNode;
}

declare const Tracks: React.ComponentType<TracksProps>;

export default Tracks;
