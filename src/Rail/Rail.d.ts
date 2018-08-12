import * as React from 'react';

interface RailEventHandlers {
  onMouseDown: () => void;
  onTouchStart: () => void;
}

export type GetRailProps = () => RailEventHandlers;

export interface RailObject {
  getRailProps: GetRailProps;
}

export interface RailProps {
  children: (railObject: RailObject) => React.ReactNode;
}

declare const Rail: React.ComponentType<RailProps>;

export default Rail;
