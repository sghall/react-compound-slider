import * as React from 'react';
import { LinearScale } from '../scales/LinearScale';
import {
  SliderItem,
  GetEventData,
  EmitMouse,
  EmitTouch,
  OtherProps,
} from '../types';

export interface TrackItem {
  id: string;
  source: SliderItem;
  target: SliderItem;
}

export type TrackEventHandlers = {
  onMouseDown: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
};

export type GetTrackProps = (
  props?: OtherProps
) => any;

export interface TracksObject {
  tracks: Array<TrackItem>;
  activeHandleID: string;
  getEventData: GetEventData;
  getTrackProps: GetTrackProps;
}

export type TracksProps = {
  /**
   * Boolean value to control whether the left most track is included in the tracks array.
   */
  left?: boolean;
  /**
   * Boolean value to control whether the right most track is included in the tracks array.
   */
  right?: boolean;
  /** @ignore */
  getEventData?: GetEventData;
  /** @ignore */
  activeHandleID?: string;
  /** @ignore */
  scale?: LinearScale;
  /** @ignore */
  handles?: SliderItem[];
  /** @ignore */
  emitMouse?: EmitMouse;
  /** @ignore */
  emitTouch?: EmitTouch;
  /**
   * A function to render the tracks. The function receives an object with an array of tracks. Note: `getEventData` can be called with an event and get the value and percent at that location (used for tooltips etc). `activeHandleID` will be a string or null.  Function signature:  `({ getEventData, activeHandleID, tracks, getTrackProps }): element`
   */
  children: (tracksObject: TracksObject) => React.ReactNode;
};
