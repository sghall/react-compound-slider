import React, { Component } from 'react';

import { TicksProps } from './types';
import { LinearScale } from '../scales/LinearScale';
import { OtherProps } from '../types';
import { callAll } from '../utils';

const defaultGetEventData = () => ({ value: 0, percent: 0 });

export class Ticks extends Component<TicksProps> {
  getTickProps = (props?: OtherProps) => {
    const { emitMouse, emitTouch } = this.props;

    return {
      ...props,
      onMouseDown: callAll<React.MouseEvent<Element>>(
        props && props.onMouseDown,
        emitMouse
      ),
      onTouchStart: callAll<React.TouchEvent<Element>>(
        props && props.onTouchStart,
        emitTouch
      ),
    };
  };

  public render() {
    const {
      getTickProps,
      props: {
        children,
        values,
        scale = new LinearScale(),
        count = 10,
        getEventData = defaultGetEventData,
        activeHandleID = '',
      },
    } = this;

    const ticks = (values ? values : scale.getTicks(count)).map((value) => ({
      id: `$$-${value}`,
      value,
      percent: scale.getValue(value),
    }));

    const renderedChildren = children({
      getEventData,
      activeHandleID,
      ticks,
      getTickProps,
    });
    return renderedChildren && React.Children.only(renderedChildren);
  }
}
