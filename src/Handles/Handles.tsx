import React, { Component } from 'react';
import { callAll } from '../utils';

import { HandlesProps, HandleEventHandlers as HE } from './types';

export class Handles<T extends HE = HE> extends Component<HandlesProps> {
  autofocus = (e: React.MouseEvent<Element>) => {
    if (e.target instanceof HTMLElement) {
      e.target.focus();
    }
  };

  getHandleProps = (id: string, props?: Partial<T>) => {
    const { emitKeyboard, emitMouse, emitTouch } = this.props;

    return {
      ...props,
      onKeyDown: callAll<React.KeyboardEvent<Element>>(
        props && props.onKeyDown,
        //@ts-ignore
        (e: React.KeyboardEvent<Element>) => emitKeyboard(e, id)
      ),
      onMouseDown: callAll<React.MouseEvent<Element>>(
        props && props.onMouseDown,
        this.autofocus,
        //@ts-ignore
        (e: React.MouseEvent) => emitMouse(e, id)
      ),
      onTouchStart: callAll<React.TouchEvent<Element>>(
        props && props.onTouchStart,
        //@ts-ignore
        (e: React.TouchEvent<Element>) => emitTouch(e, id)
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
