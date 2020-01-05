import React, { Component } from 'react';
import { callAll } from '../utils';

import { RailProps, RailEventHandlers } from './types';

export class Rail<T extends RailEventHandlers> extends Component<RailProps> {
  getRailProps = (props?: Partial<T>) => {
    const { emitMouse, emitTouch } = this.props;

    return {
      ...props,
      onMouseDown: callAll<React.MouseEvent<Element>>(
        props && props.onMouseDown,
        emitMouse
      ),
      onTouchStart: callAll(props && props.onTouchStart, emitTouch),
    };
  };

  render() {
    const {
      getRailProps,
      props: { getEventData, activeHandleID = '', children },
    } = this;

    const renderedChildren = children({
      //@ts-ignore
      getEventData,
      activeHandleID,
      getRailProps,
    });
    return renderedChildren && React.Children.only(renderedChildren);
  }
}
