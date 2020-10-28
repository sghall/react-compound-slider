import React, { Component } from 'react';
import { callAll } from '../utils';

import { OtherProps } from '../types';
import { RailProps } from './types';

const NOOP = () => ({ value: 0, percent: 0 });

export class Rail extends Component<RailProps> {
  getRailProps = (props: OtherProps = {}) => {
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
      getEventData: getEventData || NOOP,
      activeHandleID,
      getRailProps,
    });
    return renderedChildren && React.Children.only(renderedChildren);
  }
}
