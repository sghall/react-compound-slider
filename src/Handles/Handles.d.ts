import * as React from 'react';
import { SliderItem } from '..'

interface HandleEventHandlers {
  onKeyDown: (event: React.KeyboardEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
}

export type GetHandleProps = (id: string) => HandleEventHandlers;

export interface HandlesObject {
  handles: Array<SliderItem>;
  activeHandleID: string;
  getHandleProps: GetHandleProps;
}

export interface HandlesProps {
  children: (handlesObject: HandlesObject) => React.ReactNode;
}

declare const Handles: React.ComponentType<HandlesProps>;

export default Handles;
