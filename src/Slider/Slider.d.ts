import * as React from 'react';

export interface SliderProps {
  mode?: number | (() => ReadonlyArray<number>);
  step?: number;
  domain?: ReadonlyArray<number>;
  values: ReadonlyArray<number>;
  vertical?: boolean;
  reversed?: boolean;
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
