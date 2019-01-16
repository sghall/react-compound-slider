import * as React from 'react';

export type SliderModeValue = {
  key: string;
  value: number;
}
export type SliderModeFunction = (
  current: SliderModeValue[],
  next: SliderModeValue[],
  step: number,
  reverse: boolean,
  getValue: (x: number) => number
) => ReadonlyArray<SliderModeValue>

export interface SliderProps {
  mode?: number | SliderModeFunction;
  step?: number;
  domain?: ReadonlyArray<number>;
  values: ReadonlyArray<number>;
  vertical?: boolean;
  reversed?: boolean;
  disabled?: boolean;
  onUpdate?: (values: ReadonlyArray<number>) => void;
  onChange?: (values: ReadonlyArray<number>) => void;
  onSlideStart?: (values: ReadonlyArray<number>) => void;
  onSlideEnd?: (values: ReadonlyArray<number>) => void;
  className?: string;
  rootStyle?: React.CSSProperties;
  children: React.ReactNode;
}

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
