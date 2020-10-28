import { GetEventData, EmitMouse, EmitTouch, OtherProps } from '../types';

export interface RailEventHandlers {
  onMouseDown?: (event: React.MouseEvent) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
}

export type GetRailProps = (props?: OtherProps) => any;

export interface RailObject {
  activeHandleID: string;
  getEventData: GetEventData;
  getRailProps: GetRailProps;
}

export interface RailProps {
  /** @ignore */
  getEventData?: GetEventData;
  /** @ignore */
  activeHandleID?: string;
  /** @ignore */
  emitMouse?: EmitMouse;
  /** @ignore */
  emitTouch?: EmitTouch;
  /**
   * A function to render the rail. Note: `getEventData` can be called with an event and get the value and percent at that location (used for tooltips etc). `activeHandleID` will be a string or null.  Function signature: `({ getEventData, activeHandleID, getRailProps }): element`
   */
  children: (railObject: RailObject) => React.ReactNode;
};
