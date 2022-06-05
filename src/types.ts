import { MouseEvent, KeyboardEvent, TouchEvent } from 'react';

export interface SliderItem {
  id: string;
  value: number;
  percent: number;
}

export type HandleItem = {
  key: string;
  val: number;
};

export interface EventData {
  value: number;
  percent: number;
}

export type EmitKeyboard = (e: KeyboardEvent<Element>, id?: string) => void;
export type EmitMouse = (e: MouseEvent<Element>, id?: string) => void;
export type EmitTouch = (e: TouchEvent<Element>, id?: string) => void;

export type GetEventData = (e: React.SyntheticEvent | Event, isTouch?: boolean) => EventData;

export type OtherProps = { [key: string]: any };

export type Interpolator = (x: number) => number;

export type CustomMode = (
  curr: HandleItem[],
  next: HandleItem[],
  step: number,
  reversed: boolean,
  getValue: (x: number) => number
) => HandleItem[];
