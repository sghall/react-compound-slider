import React, { Component } from 'react';

import { callAll } from '../utils';
import { LinearScale } from '../scales/LinearScale';
import { TracksProps } from './types';
import { OtherProps } from '../types';

const defaultGetEventData = () => ({ value: 0, percent: 0 });

export class Tracks extends Component<TracksProps> {
  getTrackProps = (props?: OtherProps) => {
    const { emitMouse, emitTouch } = this.props;

    return {
      ...(props || {}),
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

  render() {
    const {
      getTrackProps,
      props: {
        children,
        left = true,
        right = true,
        scale = new LinearScale(),
        handles = [],
        getEventData = defaultGetEventData,
        activeHandleID = '',
      },
    } = this;

    const domain = scale.getDomain();
    const tracks = [];

    for (let i = 0; i < handles.length + 1; i++) {
      let source = handles[i - 1];
      let target = handles[i];

      if (i === 0 && left === true) {
        source = { id: '$', value: domain[0], percent: 0 };
      } else if (i === handles.length && right === true) {
        target = { id: '$', value: domain[1], percent: 100 };
      }

      if (source && target) {
        tracks.push({
          id: `${source.id}-${target.id}`,
          source,
          target,
        });
      }
    }

    const renderedChildren = children({
      getEventData,
      activeHandleID,
      tracks,
      getTrackProps,
    });

    return renderedChildren && React.Children.only(renderedChildren);
  }
}
