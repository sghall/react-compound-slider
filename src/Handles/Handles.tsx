import React, { Component } from 'react';
import { callAll } from '../utils';

import { OtherProps } from '../types';
import { HandlesProps } from './types';

export class Handles extends Component<HandlesProps> {
  autofocus = (e: React.MouseEvent<Element>) => {
    if (e.target instanceof HTMLElement) {
      e.target.focus();
    }
  };

  getHandleProps = (id: string, props: OtherProps = {}) => {
    const { emitKeyboard, emitMouse, emitTouch } = this.props;

    return {
      ...props,
      onKeyDown: callAll<React.KeyboardEvent<Element>>(
        props && props.onKeyDown,
        (e: React.KeyboardEvent<Element>) => emitKeyboard && emitKeyboard(e, id)
      ),
      onMouseDown: callAll<React.MouseEvent<Element>>(
        props && props.onMouseDown,
        this.autofocus,
        (e: React.MouseEvent) => emitMouse && emitMouse(e, id)
      ),
      onTouchStart: callAll<React.TouchEvent<Element>>(
        props && props.onTouchStart,
        (e: React.TouchEvent<Element>) => emitTouch && emitTouch(e, id)
      ),
    };
  };

  render() {
    const {
      getHandleProps,
      props: { activeHandleID = '', children, handles = [] },
    } = this;

    const renderedChildren = children({
      handles,
      activeHandleID,
      getHandleProps,
    });

    return renderedChildren && React.Children.only(renderedChildren);
  }
}
