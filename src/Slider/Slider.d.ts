import * as React from 'react';

export interface SliderProps {
  mode?: number;
  step?: number;
  domain?: Array<number>;
  values: Array<number>;
  vertical?: boolean;
  reversed?: boolean;
  onUpdate?: (values: Array<number>) => void;
  onChange?: (values: Array<number>) => void;
  onSlideStart?: (values: Array<number>) => void;
  onSlideEnd?: (values: Array<number>) => void;
  className?: string;
  rootStyle?: React.CSSProperties;
  children: Array<JSX.Element>;
}

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
