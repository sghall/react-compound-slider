import * as React from 'react';

interface TooltipEventHandlers {
  //onMouseDown: () => void;
  //onTouchStart: () => void;
}

export type GetTooltipProps = () => TooltipEventHandlers;

export interface TooltipObject {
  getTooltipProps: GetTooltipProps;
}

export interface TooltipProps {
  children: (tooltipObject: TooltipObject) => React.ReactNode;
}

declare const Tooltip: React.ComponentType<TooltipProps>;

export default Tooltip;
