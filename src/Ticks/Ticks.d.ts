import * as React from 'react';
import { SliderItem, EventData } from '..'

export interface TicksObject {
  activeHandleID: string;
  getEventData: (e: React.SyntheticEvent) => EventData; 
  ticks: Array<SliderItem>;
}

export interface TicksProps {
  count?: number;
  values?: ReadonlyArray<number>;
  children: (ticksObject: TicksObject) => React.ReactNode;
}

declare const Ticks: React.ComponentType<TicksProps>;

export default Ticks;
