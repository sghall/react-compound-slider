import * as React from 'react';
import { EventData } from '..'

interface RailEventHandlers {
  onMouseDown: () => void;
  onTouchStart: () => void;
}

export type GetRailProps = () => RailEventHandlers;

export interface RailObject {
  activeHandleID: string;
  getEventData: (e: React.SyntheticEvent) => EventData; 
  getRailProps: GetRailProps;
}

export interface RailProps {
  children: (railObject: RailObject) => React.ReactNode;
}

declare const Rail: React.ComponentType<RailProps>;

export default Rail;
