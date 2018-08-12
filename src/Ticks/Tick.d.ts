import * as React from 'react';
import { SliderItem } from '..'

export interface TicksObject {
  ticks: Array<SliderItem>;
}

export interface TicksProps {
  count?: number;
  values?: Array<number>;
  children: (ticksObject: TicksObject) => React.ReactNode;
}

declare const Ticks: React.ComponentType<TicksProps>;

export default Ticks;