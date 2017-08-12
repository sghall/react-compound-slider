import React from "react";
import PropTypes from "prop-types";
import Label from "./label";

export default class Slider extends React.Component {
  static get propTypes() {
    return {
      ariaLabelledby: PropTypes.string,
      ariaControls: PropTypes.string,
      classNames: PropTypes.objectOf(PropTypes.string).isRequired,
      formatLabel: PropTypes.func,
      maxValue: PropTypes.number,
      minValue: PropTypes.number,
      onSliderDrag: PropTypes.func.isRequired,
      onSliderKeyDown: PropTypes.func.isRequired,
      percentage: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.node = null;

    [
      "handleMouseDown",
      "handleMouseUp",
      "handleMouseMove",
      "handleTouchStart",
      "handleTouchMove",
      "handleTouchEnd",
      "handleKeyDown"
    ].forEach(method => {
      this[method] = this.method.bind(this);
    });
  }

  componentWillUnmount() {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
    this.removeDocumentTouchEndListener();
    this.removeDocumentTouchMoveListener();
  }

  getStyle() {
    const perc = (this.props.percentage || 0) * 100;
    const style = {
      position: "absolute",
      left: `${perc}%`
    };

    return style;
  }

  addDocumentMouseMoveListener() {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener("mousemove", this.handleMouseMove);
  }

  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener("mouseup", this.handleMouseUp);
  }

  addDocumentTouchMoveListener() {
    this.removeDocumentTouchMoveListener();
    this.node.ownerDocument.addEventListener("touchmove", this.handleTouchMove);
  }

  addDocumentTouchEndListener() {
    this.removeDocumentTouchEndListener();
    this.node.ownerDocument.addEventListener("touchend", this.handleTouchEnd);
  }

  removeDocumentMouseMoveListener() {
    this.node.ownerDocument.removeEventListener(
      "mousemove",
      this.handleMouseMove
    );
  }

  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener("mouseup", this.handleMouseUp);
  }

  removeDocumentTouchMoveListener() {
    this.node.ownerDocument.removeEventListener(
      "touchmove",
      this.handleTouchMove
    );
  }

  removeDocumentTouchEndListener() {
    this.node.ownerDocument.removeEventListener(
      "touchend",
      this.handleTouchEnd
    );
  }

  handleMouseDown() {
    this.addDocumentMouseMoveListener();
    this.addDocumentMouseUpListener();
  }

  handleMouseUp() {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
  }

  handleMouseMove(event) {
    this.props.onSliderDrag(event, this.props.type);
  }

  handleTouchStart() {
    this.addDocumentTouchEndListener();
    this.addDocumentTouchMoveListener();
  }

  handleTouchMove(event) {
    this.props.onSliderDrag(event, this.props.type);
  }

  handleTouchEnd() {
    this.removeDocumentTouchMoveListener();
    this.removeDocumentTouchEndListener();
  }

  handleKeyDown(event) {
    this.props.onSliderKeyDown(event, this.props.type);
  }

  render() {
    const style = this.getStyle();

    return (
      <span
        className={this.props.classNames.sliderContainer}
        ref={node => {
          this.node = node;
        }}
        style={style}
      >
        <Label
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="value"
        >
          {this.props.value}
        </Label>

        <div
          aria-labelledby={this.props.ariaLabelledby}
          aria-controls={this.props.ariaControls}
          aria-valuemax={this.props.maxValue}
          aria-valuemin={this.props.minValue}
          aria-valuenow={this.props.value}
          className={this.props.classNames.slider}
          draggable="false"
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          role="slider"
          tabIndex="0"
        />
      </span>
    );
  }
}
