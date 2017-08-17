import { clamp } from "../../utils";

export function getPercentageFromPosition(position, clientRect) {
  const length = clientRect.width;
  const sizePerc = position.x / length;

  return sizePerc || 0;
}

export function getValueFromPosition(position, minValue, maxValue, clientRect) {
  const sizePerc = getPercentageFromPosition(position, clientRect);
  const valueDiff = maxValue - minValue;

  return minValue + valueDiff * sizePerc;
}

export function getValueFromProps(props, isMultiValue) {
  if (isMultiValue) {
    return Object.assign({}, props.value);
  }

  return {
    min: props.minValue,
    max: props.value
  };
}

export function getPercentageFromValue(value, minValue, maxValue) {
  const validValue = clamp(value, minValue, maxValue);
  const valueDiff = maxValue - minValue;
  const valuePerc = (validValue - minValue) / valueDiff;

  return valuePerc || 0;
}

export function getPercentagesFromValues(values, minValue, maxValue) {
  return {
    min: getPercentageFromValue(values.min, minValue, maxValue),
    max: getPercentageFromValue(values.max, minValue, maxValue)
  };
}

export function getPositionFromValue(value, minValue, maxValue, clientRect) {
  const length = clientRect.width;
  const valuePerc = getPercentageFromValue(value, minValue, maxValue);
  const positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0
  };
}

export function getPositionsFromValues(values, minValue, maxValue, clientRect) {
  return {
    min: getPositionFromValue(values.min, minValue, maxValue, clientRect),
    max: getPositionFromValue(values.max, minValue, maxValue, clientRect)
  };
}

export function getPositionFromEvent(event, clientRect) {
  const length = clientRect.width;
  const { clientX } = event.touches ? event.touches[0] : event;

  return {
    x: clamp(clientX - clientRect.left, 0, length),
    y: 0
  };
}

export function getStepValueFromValue(value, valuePerStep) {
  return Math.round(value / valuePerStep) * valuePerStep;
}
