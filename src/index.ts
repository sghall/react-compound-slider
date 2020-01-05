import {
  SliderItem as _SliderItem,
  HandleItem as _HandleItem,
  EventData as _EventData,
  CustomMode as _CustomMode,
  GetEventData as _GetEventData,
} from './types';

export * from './Slider';
export * from './Rail';
export * from './Ticks';
export * from './Tracks';
export * from './Handles';
export { mode1, mode2, mode3 } from './Slider/modes';

export type SliderItem = _SliderItem;
export type HandleItem = _HandleItem;
export type EventData = _EventData;
export type CustomMode = _CustomMode;
export type GetEventData = _GetEventData;
