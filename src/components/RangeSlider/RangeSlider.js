import React from "react";
import PropTypes from "prop-types";
import * as valueTransformer from "./value-transformer";
import DEFAULT_CLASS_NAMES from "./default-class-names";
import Label from "./label";
import rangePropType from "./range-prop-type";
import valuePropType from "./value-prop-type";
import Slider from "./Slider";
import Track from "./Track";
import {
  captialize,
  distanceTo,
  isDefined,
  isObject,
  length
} from "../../utils";
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from "./key-codes";

export default class InputRange extends React.Component {
  static get propTypes() {
    return {
      ariaLabelledby: PropTypes.string,
      ariaControls: PropTypes.string,
      classNames: PropTypes.objectOf(PropTypes.string),
      disabled: PropTypes.bool,
      draggableTrack: PropTypes.bool,
      formatLabel: PropTypes.func,
      maxValue: rangePropType,
      minValue: rangePropType,
      name: PropTypes.string,
      onChangeStart: PropTypes.func,
      onChange: PropTypes.func.isRequired,
      onChangeComplete: PropTypes.func,
      step: PropTypes.number,
      value: valuePropType
    };
  }

  static get defaultProps() {
    return {
      classNames: DEFAULT_CLASS_NAMES,
      disabled: false,
      maxValue: 10,
      minValue: 0,
      step: 1
    };
  }

  constructor(props) {
    super(props);

    this.startValue = null;
    this.node = null;
    this.trackNode = null;
    this.isSliderDragging = false;

    [
      "handleSliderDrag",
      "handleTrackDrag",
      "handleSliderKeyDown",
      "handleTrackMouseDown",
      "handleInteractionStart",
      "handleInteractionEnd",
      "handleKeyDown",
      "handleKeyUp",
      "handleMouseDown",
      "handleMouseUp",
      "handleTouchStart",
      "handleTouchEnd"
    ].forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  componentWillUnmount() {
    this.removeDocumentMouseUpListener();
    this.removeDocumentTouchEndListener();
  }

  getComponentClassName() {
    if (!this.props.disabled) {
      return this.props.classNames.inputRange;
    }

    return this.props.classNames.disabledInputRange;
  }

  getTrackClientRect() {
    return this.trackNode.getClientRect();
  }

  getKeyByPosition(position) {
    const values = valueTransformer.getValueFromProps(
      this.props,
      this.isMultiValue()
    );
    const positions = valueTransformer.getPositionsFromValues(
      values,
      this.props.minValue,
      this.props.maxValue,
      this.getTrackClientRect()
    );

    if (this.isMultiValue()) {
      const distanceToMin = distanceTo(position, positions.min);
      const distanceToMax = distanceTo(position, positions.max);

      if (distanceToMin < distanceToMax) {
        return "min";
      }
    }

    return "max";
  }

  getKeys() {
    if (this.isMultiValue()) {
      return ["min", "max"];
    }

    return ["max"];
  }

  hasStepDifference(values) {
    const currentValues = valueTransformer.getValueFromProps(
      this.props,
      this.isMultiValue()
    );

    return (
      length(values.min, currentValues.min) >= this.props.step ||
      length(values.max, currentValues.max) >= this.props.step
    );
  }

  isMultiValue() {
    return isObject(this.props.value);
  }

  isWithinRange(values) {
    if (this.isMultiValue()) {
      return (
        values.min >= this.props.minValue &&
        values.max <= this.props.maxValue &&
        values.min < values.max
      );
    }

    return (
      values.max >= this.props.minValue && values.max <= this.props.maxValue
    );
  }

  shouldUpdate(values) {
    return this.isWithinRange(values) && this.hasStepDifference(values);
  }

  updatePosition(key, position) {
    const values = valueTransformer.getValueFromProps(
      this.props,
      this.isMultiValue()
    );
    const positions = valueTransformer.getPositionsFromValues(
      values,
      this.props.minValue,
      this.props.maxValue,
      this.getTrackClientRect()
    );

    positions[key] = position;

    this.updatePositions(positions);
  }

  updatePositions(positions) {
    const values = {
      min: valueTransformer.getValueFromPosition(
        positions.min,
        this.props.minValue,
        this.props.maxValue,
        this.getTrackClientRect()
      ),
      max: valueTransformer.getValueFromPosition(
        positions.max,
        this.props.minValue,
        this.props.maxValue,
        this.getTrackClientRect()
      )
    };

    const transformedValues = {
      min: valueTransformer.getStepValueFromValue(values.min, this.props.step),
      max: valueTransformer.getStepValueFromValue(values.max, this.props.step)
    };

    this.updateValues(transformedValues);
  }

  updateValue(key, value) {
    const values = valueTransformer.getValueFromProps(
      this.props,
      this.isMultiValue()
    );

    values[key] = value;

    this.updateValues(values);
  }

  updateValues(values) {
    if (!this.shouldUpdate(values)) {
      return;
    }

    this.props.onChange(this.isMultiValue() ? values : values.max);
  }

  incrementValue(key) {
    const values = valueTransformer.getValueFromProps(
      this.props,
      this.isMultiValue()
    );
    const value = values[key] + this.props.step;

    this.updateValue(key, value);
  }

  decrementValue(key) {
    const values = valueTransformer.getValueFromProps(
      this.props,
      this.isMultiValue()
    );
    const value = values[key] - this.props.step;

    this.updateValue(key, value);
  }

  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener("mouseup", this.handleMouseUp);
  }

  addDocumentTouchEndListener() {
    this.removeDocumentTouchEndListener();
    this.node.ownerDocument.addEventListener("touchend", this.handleTouchEnd);
  }

  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener("mouseup", this.handleMouseUp);
  }

  removeDocumentTouchEndListener() {
    this.node.ownerDocument.removeEventListener(
      "touchend",
      this.handleTouchEnd
    );
  }

  handleSliderDrag(event, key) {
    if (this.props.disabled) {
      return;
    }

    const position = valueTransformer.getPositionFromEvent(
      event,
      this.getTrackClientRect()
    );
    this.isSliderDragging = true;
    requestAnimationFrame(() => this.updatePosition(key, position));
  }

  handleTrackDrag(event, prevEvent) {
    if (
      this.props.disabled ||
      !this.props.draggableTrack ||
      this.isSliderDragging
    ) {
      return;
    }

    const { maxValue, minValue, value: { max, min } } = this.props;

    const position = valueTransformer.getPositionFromEvent(
      event,
      this.getTrackClientRect()
    );
    const value = valueTransformer.getValueFromPosition(
      position,
      minValue,
      maxValue,
      this.getTrackClientRect()
    );
    const stepValue = valueTransformer.getStepValueFromValue(
      value,
      this.props.step
    );

    const prevPosition = valueTransformer.getPositionFromEvent(
      prevEvent,
      this.getTrackClientRect()
    );
    const prevValue = valueTransformer.getValueFromPosition(
      prevPosition,
      minValue,
      maxValue,
      this.getTrackClientRect()
    );
    const prevStepValue = valueTransformer.getStepValueFromValue(
      prevValue,
      this.props.step
    );

    const offset = prevStepValue - stepValue;

    const transformedValues = {
      min: min - offset,
      max: max - offset
    };

    this.updateValues(transformedValues);
  }

  handleSliderKeyDown(event, key) {
    if (this.props.disabled) {
      return;
    }

    switch (event.keyCode) {
      case LEFT_ARROW:
      case DOWN_ARROW:
        event.preventDefault();
        this.decrementValue(key);
        break;

      case RIGHT_ARROW:
      case UP_ARROW:
        event.preventDefault();
        this.incrementValue(key);
        break;

      default:
        break;
    }
  }

  handleTrackMouseDown(event, position) {
    if (this.props.disabled) {
      return;
    }

    const { maxValue, minValue, value: { max, min } } = this.props;

    event.preventDefault();

    const value = valueTransformer.getValueFromPosition(
      position,
      minValue,
      maxValue,
      this.getTrackClientRect()
    );
    const stepValue = valueTransformer.getStepValueFromValue(
      value,
      this.props.step
    );

    if (!this.props.draggableTrack || stepValue > max || stepValue < min) {
      this.updatePosition(this.getKeyByPosition(position), position);
    }
  }

  handleInteractionStart() {
    if (this.props.onChangeStart) {
      this.props.onChangeStart(this.props.value);
    }

    if (this.props.onChangeComplete && !isDefined(this.startValue)) {
      this.startValue = this.props.value;
    }
  }

  handleInteractionEnd() {
    if (this.isSliderDragging) {
      this.isSliderDragging = false;
    }

    if (!this.props.onChangeComplete || !isDefined(this.startValue)) {
      return;
    }

    if (this.startValue !== this.props.value) {
      this.props.onChangeComplete(this.props.value);
    }

    this.startValue = null;
  }

  handleKeyDown(event) {
    this.handleInteractionStart(event);
  }

  handleKeyUp(event) {
    this.handleInteractionEnd(event);
  }

  handleMouseDown(event) {
    this.handleInteractionStart(event);
    this.addDocumentMouseUpListener();
  }

  handleMouseUp(event) {
    this.handleInteractionEnd(event);
    this.removeDocumentMouseUpListener();
  }

  handleTouchStart(event) {
    this.handleInteractionStart(event);
    this.addDocumentTouchEndListener();
  }

  handleTouchEnd(event) {
    this.handleInteractionEnd(event);
    this.removeDocumentTouchEndListener();
  }

  renderSliders() {
    const values = valueTransformer.getValueFromProps(
      this.props,
      this.isMultiValue()
    );
    const percentages = valueTransformer.getPercentagesFromValues(
      values,
      this.props.minValue,
      this.props.maxValue
    );

    return this.getKeys().map(key => {
      const value = values[key];
      const percentage = percentages[key];

      let { maxValue, minValue } = this.props;

      if (key === "min") {
        maxValue = values.max;
      } else {
        minValue = values.min;
      }

      const slider = (
        <Slider
          ariaLabelledby={this.props.ariaLabelledby}
          ariaControls={this.props.ariaControls}
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          key={key}
          maxValue={maxValue}
          minValue={minValue}
          onSliderDrag={this.handleSliderDrag}
          onSliderKeyDown={this.handleSliderKeyDown}
          percentage={percentage}
          type={key}
          value={value}
        />
      );

      return slider;
    });
  }

  renderHiddenInputs() {
    if (!this.props.name) {
      return [];
    }

    const isMultiValue = this.isMultiValue();
    const values = valueTransformer.getValueFromProps(this.props, isMultiValue);

    return this.getKeys().map(key => {
      const value = values[key];
      const name = isMultiValue
        ? `${this.props.name}${captialize(key)}`
        : this.props.name;

      return <input key={key} type="hidden" name={name} value={value} />;
    });
  }

  render() {
    const componentClassName = this.getComponentClassName();
    const values = valueTransformer.getValueFromProps(
      this.props,
      this.isMultiValue()
    );
    const percentages = valueTransformer.getPercentagesFromValues(
      values,
      this.props.minValue,
      this.props.maxValue
    );

    return (
      <div
        aria-disabled={this.props.disabled}
        ref={node => {
          this.node = node;
        }}
        className={componentClassName}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
      >
        <Label
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="min"
        >
          {this.props.minValue}
        </Label>

        <Track
          classNames={this.props.classNames}
          draggableTrack={this.props.draggableTrack}
          ref={trackNode => {
            this.trackNode = trackNode;
          }}
          percentages={percentages}
          onTrackDrag={this.handleTrackDrag}
          onTrackMouseDown={this.handleTrackMouseDown}
        >
          {this.renderSliders()}
        </Track>

        <Label
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="max"
        >
          {this.props.maxValue}
        </Label>

        {this.renderHiddenInputs()}
      </div>
    );
  }
}
