import React, { PureComponent, isValidElement } from 'react';
import warning from 'warning';
import { mode1, mode2, mode3 } from './modes';
import {
  isNotValidTouch,
  getTouchPosition,
  getUpdatedHandles,
  getSliderDomain,
  getHandles,
  prfx,
} from './utils';
import { Rail } from '../Rail';
import { Handles } from '../Handles';
import { Ticks } from '../Ticks';
import { Tracks } from '../Tracks';
import { LinearScale } from '../scales/LinearScale';
import { DiscreteScale } from '../scales/DiscreteScale';

import { SliderProps, SliderState } from './types';
import { HandleItem } from '../types';

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

const noop = () => {};

const compare = (b: any[]) => (m: any, d: any, i: number) => m && b[i] === d;

const equal = (a: any, b: any) => {
  return a === b || (a.length === b.length && a.reduce(compare(b), true));
};

interface RCSComponent {
  type: {
    name: 'Rail' | 'Handles' | 'Ticks' | 'Tracks';
  };
}

const isRCSComponent = (item: React.ReactNode) => {
  if (!isValidElement(item)) {
    return false;
  }

  const type = (item as RCSComponent).type;
  const name = type ? type.name : '';

  return (
    name === Handles.name ||
    name === Rail.name ||
    name === Ticks.name ||
    name === Tracks.name
  );
};

const getNextValue = (
  curr: number,
  step: number,
  domain: ReadonlyArray<number>,
  reversed: boolean
) => {
  const newVal = reversed ? curr - step : curr + step;
  return reversed ? Math.max(domain[0], newVal) : Math.min(domain[1], newVal);
};

const getPrevValue = (
  curr: number,
  step: number,
  domain: ReadonlyArray<number>,
  reversed: boolean
) => {
  const newVal = reversed ? curr + step : curr - step;
  return reversed ? Math.min(domain[1], newVal) : Math.max(domain[0], newVal);
};

const defaultDomain = [0, 100];

export class Slider<
  T extends HTMLDivElement = HTMLDivElement
> extends PureComponent<SliderProps, SliderState> {
  state = {
    step: 0.1,
    values: [],
    domain: defaultDomain,
    handles: [] as HandleItem[],
    reversed: false,
    activeHandleID: '',
    valueToPerc: null,
    valueToStep: null,
    pixelToStep: null,
  };

  slider = React.createRef<T>();

  static getDerivedStateFromProps(
    nextProps: SliderProps,
    prevState: SliderState
  ) {
    const {
      step = 0.1,
      values,
      domain = defaultDomain,
      reversed = false,
      onUpdate = noop,
      onChange = noop,
      warnOnChanges = false,
    } = nextProps;
    let valueToPerc = prevState.valueToPerc;
    let valueToStep = prevState.valueToStep;
    let pixelToStep = prevState.pixelToStep;

    const nextState: Partial<SliderState> = {};

    if (!valueToPerc || !valueToStep || !pixelToStep) {
      valueToPerc = new LinearScale();
      valueToStep = new DiscreteScale();
      pixelToStep = new DiscreteScale();

      nextState.valueToPerc = valueToPerc;
      nextState.valueToStep = valueToStep;
      nextState.pixelToStep = pixelToStep;
    }

    if (
      prevState.domain === defaultDomain ||
      prevState.step === null ||
      prevState.domain === null ||
      prevState.reversed === null ||
      step !== prevState.step ||
      domain[0] !== prevState.domain[0] ||
      domain[1] !== prevState.domain[1] ||
      reversed !== prevState.reversed
    ) {
      const [min, max] = domain;
      valueToStep.setStep(step).setRange([min, max]).setDomain([min, max]);

      if (reversed === true) {
        valueToPerc.setDomain([min, max]).setRange([100, 0]);
        pixelToStep.setStep(step).setRange([max, min]);
      } else {
        valueToPerc.setDomain([min, max]).setRange([0, 100]);
        pixelToStep.setStep(step).setRange([min, max]);
      }

      warning(
        max > min,
        `${prfx} Max must be greater than min (even if reversed). Max is ${max}. Min is ${min}.`
      );

      const { handles, changes } = getHandles(
        values || prevState.values,
        reversed,
        valueToStep,
        warnOnChanges
      );

      if (changes || values === undefined || values === prevState.values) {
        onUpdate(handles.map((d) => d.val));
        onChange(handles.map((d) => d.val));
      }

      nextState.step = step;
      nextState.values = values;
      nextState.domain = domain === defaultDomain ? [...domain] : domain;
      nextState.handles = handles;
      nextState.reversed = reversed;
    } else if (!equal(values, prevState.values)) {
      const { handles, changes } = getHandles(
        values,
        reversed,
        valueToStep,
        warnOnChanges
      );

      if (changes) {
        onUpdate(handles.map((d) => d.val));
        onChange(handles.map((d) => d.val));
      }

      nextState.values = values;
      nextState.handles = handles;
    }

    if (Object.keys(nextState).length) {
      return nextState;
    }

    return null;
  }

  componentDidMount() {
    const { pixelToStep } = this.state;
    const { vertical } = this.props;

    // @ts-ignore
    pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical));
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners() {
    if (isBrowser) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
    }
  }

  onKeyDown = (e: KeyboardEvent, handleID: string) => {
    let validUpKeys = ['ArrowRight', 'ArrowUp'];
    let validDownKeys = ['ArrowDown', 'ArrowLeft'];

    const {
      state: { handles },
      props: {
        step = 0.1,
        reversed = false,
        vertical = false,
        domain = [0, 100] as number[],
      },
    } = this;
    const key = e.key || `${e.keyCode}`;

    if (!validUpKeys.concat(validDownKeys).includes(key)) {
      return;
    }

    if (vertical) {
      [validUpKeys, validDownKeys] = [validDownKeys, validUpKeys];
    }

    e.stopPropagation && e.stopPropagation();
    e.preventDefault && e.preventDefault();

    const found = handles.find((value) => {
      return value.key === handleID;
    });

    if (!found) {
      return;
    }

    const currVal = found.val;
    let newVal = currVal;

    if (validUpKeys.includes(key)) {
      newVal = getNextValue(currVal, step, domain, reversed);
    } else if (validDownKeys.includes(key)) {
      newVal = getPrevValue(currVal, step, domain, reversed);
    }
    const nextHandles = handles.map((v) =>
      v.key === handleID ? { key: v.key, val: newVal } : v
    );

    this.submitUpdate(nextHandles, true);
  };

  onMouseDown = (e: MouseEvent, handleID: string) => {
    this.onStart(e, handleID, false);
  };

  onTouchStart = (e: TouchEvent, handleID: string) => {
    if (isNotValidTouch(e)) {
      return;
    }

    this.onStart(e, handleID, true);
  };

  onStart(e: MouseEvent | TouchEvent, handleID: string, isTouch: boolean) {
    const {
      state: { handles },
      props: { onSlideStart = noop },
    } = this;

    if (!isTouch) {
      e.preventDefault && e.preventDefault();
    }

    e.stopPropagation && e.stopPropagation();

    const found = handles.find((value) => {
      return value.key === handleID;
    });

    if (found) {
      this.setState({ activeHandleID: handleID });
      onSlideStart(
        handles.map((d) => d.val),
        { activeHandleID: handleID }
      );
      isTouch ? this.addTouchEvents() : this.addMouseEvents();
    } else {
      this.setState({ activeHandleID: '' });
      this.handleRailAndTrackClicks(e, isTouch);
    }
  }

  handleRailAndTrackClicks(e: MouseEvent | TouchEvent, isTouch: boolean) {
    const {
      state: { handles: curr, pixelToStep },
      props: { vertical, reversed = false },
    } = this;
    const { slider } = this;

    // double check the dimensions of the slider
    // @ts-ignore
    pixelToStep.setDomain(getSliderDomain(slider.current, vertical));

    // find the closest value (aka step) to the event location
    let updateValue: number;

    if (isTouch) {
      // @ts-ignore
      updateValue = pixelToStep.getValue(getTouchPosition(vertical, e));
    } else {
      // @ts-ignore
      updateValue = pixelToStep.getValue(vertical ? e.clientY : e.pageX);
    }

    // find the closest handle key
    let updateKey = '';
    let minDiff = Infinity;

    for (let i = 0; i < curr.length; i++) {
      const { key, val } = curr[i];
      const diff = Math.abs(val - updateValue);

      if (diff < minDiff) {
        updateKey = key;
        minDiff = diff;
      }
    }

    // generate a "candidate" set of values - a suggestion of what to do
    const nextHandles = getUpdatedHandles(
      curr,
      updateKey,
      updateValue,
      reversed
    );

    // submit the candidate values
    this.setState({ activeHandleID: updateKey }, () => {
      this.submitUpdate(nextHandles, true);
      isTouch ? this.addTouchEvents() : this.addMouseEvents();
    });
  }

  getEventData = (e: React.MouseEvent | React.TouchEvent, isTouch: boolean) => {
    const {
      state: { pixelToStep, valueToPerc },
      props: { vertical },
    } = this;

    // double check the dimensions of the slider
    // @ts-ignore
    pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical));

    let value;

    if (isTouch && e instanceof TouchEvent) {
      // @ts-ignore
      value = pixelToStep.getValue(getTouchPosition(vertical, e));
    } else if (e instanceof MouseEvent) {
      // @ts-ignore
      value = pixelToStep.getValue(vertical ? e.clientY : e.pageX);
    }
    return {
      value,
      // @ts-ignore
      percent: valueToPerc.getValue(value),
    };
  };

  addMouseEvents() {
    if (isBrowser) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }

  addTouchEvents() {
    if (isBrowser) {
      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchend', this.onTouchEnd);
    }
  }

  onMouseMove = (e: MouseEvent) => {
    const {
      state: { handles: curr, pixelToStep, activeHandleID = '' },
      props: { vertical, reversed = false },
    } = this;
    // double check the dimensions of the slider
    // @ts-ignore
    pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical));

    // find the closest value (aka step) to the event location
    // @ts-ignore
    const updateValue = pixelToStep.getValue(vertical ? e.clientY : e.pageX);

    // generate a "candidate" set of values - a suggestion of what to do
    const nextHandles = getUpdatedHandles(
      curr,
      activeHandleID,
      updateValue,
      reversed
    );

    // submit the candidate values
    this.submitUpdate(nextHandles);
  };

  onTouchMove = (e: TouchEvent) => {
    const {
      state: { handles: curr, pixelToStep, activeHandleID },
      props: { vertical, reversed },
    } = this;
    if (pixelToStep === null || isNotValidTouch(e)) {
      return;
    }

    // double check the dimensions of the slider
    // @ts-ignore
    pixelToStep.setDomain(getSliderDomain(this.slider.current, vertical));

    // find the closest value (aka step) to the event location
    // @ts-ignore
    const updateValue = pixelToStep.getValue(getTouchPosition(vertical, e));

    // generate a "candidate" set of values - a suggestion of what to do
    const nextHandles = getUpdatedHandles(
      curr,
      activeHandleID,
      updateValue,
      reversed
    );

    // submit the candidate values
    this.submitUpdate(nextHandles);
  };

  submitUpdate(next: HandleItem[], callOnChange = false) {
    const {
      mode = 1,
      step = 0.1,
      onUpdate = noop,
      onChange = noop,
      reversed = false,
    } = this.props;
    //@ts-ignore
    const { getValue } = this.state.valueToStep;

    this.setState(({ handles: curr }) => {
      let handles: HandleItem[] = [];

      // given the current handles and a candidate set, decide what to do
      if (typeof mode === 'function') {
        handles = mode(curr, next, step, reversed, getValue);
        warning(
          Array.isArray(handles),
          'Custom mode function did not return an array.'
        );
      } else {
        switch (mode) {
          case 1:
            handles = mode1(curr, next);
            break;
          case 2:
            handles = mode2(curr, next);
            break;
          case 3:
            handles = mode3(curr, next, step, reversed, getValue);
            break;
          default:
            handles = next;
            warning(false, `${prfx} Invalid mode value.`);
        }
      }

      onUpdate(handles.map((d) => d.val));

      if (callOnChange) {
        onChange(handles.map((d) => d.val));
      }

      return { handles };
    });
  }

  onMouseUp = () => {
    const {
      state: { handles = [], activeHandleID },
      props: { onChange = noop, onSlideEnd = noop },
    } = this;

    onChange(handles.map((d) => d.val));
    onSlideEnd(
      handles.map((d) => d.val),
      { activeHandleID }
    );

    this.setState({ activeHandleID: '' });

    if (isBrowser) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  };

  onTouchEnd = () => {
    const {
      state: { handles, activeHandleID },
      props: { onChange = noop, onSlideEnd = noop },
    } = this;

    onChange(handles.map((d) => d.val));
    onSlideEnd(
      handles.map((d) => d.val),
      { activeHandleID }
    );

    this.setState({ activeHandleID: '' });

    if (isBrowser) {
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
    }
  };

  render() {
    const {
      state: { handles, valueToPerc, activeHandleID },
      props: {
        className,
        rootStyle = {},
        rootProps = {},
        component: Comp = 'div',
        disabled = false,
        flatten = false,
      },
    } = this;

    const mappedHandles = handles.map(({ key, val }) => {
      // @ts-ignore
      return { id: key, value: val, percent: valueToPerc.getValue(val) };
    });

    const children = React.Children.map(this.props.children, (child) => {
      if (isRCSComponent(child) === true) {
        return React.cloneElement(child as React.ReactElement, {
          scale: valueToPerc,
          handles: mappedHandles,
          activeHandleID,
          getEventData: this.getEventData,
          emitKeyboard: disabled ? noop : this.onKeyDown,
          emitMouse: disabled ? noop : this.onMouseDown,
          emitTouch: disabled ? noop : this.onTouchStart,
        });
      } else {
        return child;
      }
    });

    return flatten ? (
      <>
        {React.createElement(Comp, {
          ...rootProps,
          style: rootStyle,
          className: className,
          ref: this.slider,
        })}
        {children}
      </>
    ) : (
      <>
        {React.createElement(
          Comp,
          {
            ...rootProps,
            style: rootStyle,
            className: className,
            ref: this.slider,
          },
          children
        )}
      </>
    );
  }
}
