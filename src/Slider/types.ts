import React from 'react';
import { LinearScale } from '../scales/LinearScale';
import { DiscreteScale } from '../scales/DiscreteScale';
import { HandleItem, CustomMode } from '../types';

export interface SliderProps {
  /**
   * String component used for slider root. Defaults to 'div'.
   */
  component?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | React.ReactNode;
  /**
   * An object with any inline styles you want applied to the root element.
   */
  rootStyle?: any;
  /**
   * An object with any props you want applied to the root element.
   */
  rootProps?: { [key: string]: any };
  /**
   * CSS class name applied to the root element of the slider.
   */
  className?: string;
  /**
   * Two element array of numbers providing the min and max values for the slider [min, max] e.g. [0, 100].
   * It does not matter if the slider is reversed on the screen, domain is always [min, max] with min < max.
   */
  domain?: ReadonlyArray<number>;
  /**
   * An array of numbers. You can supply one for a value slider, two for a range slider or more to create n-handled sliders.
   * The values should correspond to valid step values in the domain.
   * The numbers will be forced into the domain if they are two small or large.
   */
  values: ReadonlyArray<number>;
  /**
   * The step value for the slider.
   */
  step?: number;
  /**
   * The interaction mode. Value of 1 will allow handles to cross each other.
   * Value of 2 will keep the sliders from crossing and separated by a step.
   * Value of 3 will make the handles pushable and keep them a step apart.
   * ADVANCED: You can also supply a function that will be passed the current values and the incoming update.
   * Your function should return what the state should be set as.
   */
  mode?: 1 | 2 | 3 | CustomMode;
  /**
   * Set to true if the slider is displayed vertically to tell the slider to use the height to calculate positions.
   */
  vertical?: boolean;
  /**
   * Reverse the display of slider values.
   */
  reversed?: boolean;
  /**
   * Function triggered when the value of the slider has changed. This will recieve changes at the end of a slide as well as changes from clicks on rails and tracks. Receives values.
   */
  onChange?: (values: ReadonlyArray<number>) => void;
  /**
   * Function called with the values at each update (caution: high-volume updates when dragging). Receives values.
   */
  onUpdate?: (values: ReadonlyArray<number>) => void;
  /**
   * Function triggered with ontouchstart or onmousedown on a handle. Receives values.
   */
  onSlideStart?: (
    values: ReadonlyArray<number>,
    data: { activeHandleID: string }
  ) => void;
  /**
   * Function triggered on ontouchend or onmouseup on a handle. Receives values.
   */
  onSlideEnd?: (
    values: ReadonlyArray<number>,
    data: { activeHandleID: string }
  ) => void;
  /**
   * Ignore all mouse, touch and keyboard events.
   */
  disabled?: boolean;
  /**
   * Render slider children as siblings. This is primarily for SVG sliders. See the SVG example.
   */
  flatten?: boolean;
  /**
   * When true, the slider will warn if values are changed to fit domain and step values.  Defaults to false.
   */
  warnOnChanges?: boolean;
  /**
   * Component children to render.
   */
  children?: React.ReactNode;
}

export interface SliderState {
  step?: number | null;
  values: ReadonlyArray<number> | null;
  domain: ReadonlyArray<number>;
  handles: HandleItem[];
  reversed: boolean | null;
  activeHandleID: string;
  valueToPerc: LinearScale | null;
  valueToStep: DiscreteScale | null;
  pixelToStep: DiscreteScale | null;
}
