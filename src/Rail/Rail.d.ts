import * as React from 'react';
import { GetEventData } from '..'

interface RailEventHandlers {
  onMouseDown: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
}

export type GetRailProps = () => RailEventHandlers;

export interface RailObject {
  activeHandleID: string;
  getEventData: GetEventData; 
  getRailProps: GetRailProps;
}

export interface RailProps {
  children: (railObject: RailObject) => React.ReactNode;
}

declare const Rail: React.ComponentType<RailProps>;

export default Rail;
