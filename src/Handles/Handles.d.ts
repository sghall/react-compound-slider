import * as React from 'react';
import { SliderItem } from '..'

interface HandleEventHandlers {
  onKeyDown: () => void;
  onMouseDown: () => void;
  onTouchStart: () => void;
}

export type GetHandleProps = (id: string) => HandleEventHandlers;

export interface HandlesObject {
  handles: Array<SliderItem>;
  getHandleProps: GetHandleProps;
}

interface HandlesProps {
  children: (handlesObject: HandlesObject) => React.ReactNode;
}

declare const Handles: React.ComponentType<HandlesProps>;

export default Handles;
