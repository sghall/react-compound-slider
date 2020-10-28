import React from 'react';

import {
  SliderItem,
  EmitMouse,
  EmitKeyboard,
  EmitTouch,
  OtherProps,
} from '../types';

export interface HandleEventHandlers {
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
}

export type GetHandleProps = (id: string, props?: OtherProps) => any;

export interface HandlesObject {
  handles: Array<SliderItem>;
  activeHandleID: string;
  getHandleProps: GetHandleProps;
}

export type HandlesProps = {
  /** @ignore */
  activeHandleID?: string;
  /** @ignore */
  handles?: Array<SliderItem>;
  /** @ignore */
  emitMouse?: EmitMouse;
  /** @ignore */
  emitKeyboard?: EmitKeyboard;
  /** @ignore */
  emitTouch?: EmitTouch;
  /**
   * A function to render the handles.
   * The function receives an object with an array of handles and functions to get handle props
   * `({ handles, getHandleProps }): element`
   */
  children: (handlesObject: HandlesObject) => React.ReactNode;
};
