import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import {
  getMousePosition,
  isEventFromHandle,
  getHandleCenterPosition,
  pauseEvent
} from "./utils";

const noop = () => {};

class ScaledSlider extends PureComponent {
  scale = scaleLinear().range([0, 100]);

  onMouseDown = e => {
    const { vertical = false } = this.props;

    if (e.button !== 0) {
      return;
    }

    let position = getMousePosition(vertical, e);

    if (!isEventFromHandle(e, this.handleRefs)) {
      this.dragOffset = 0;
    } else {
      const center = getHandleCenterPosition(vertical, e.target);
      this.dragOffset = position - center;
      position = center;
    }

    this.onStart(position);
    this.addDocumentMouseEvents();
    pauseEvent(e);
  };

  onMouseMove = e => {
    const { vertical = false } = this.props;

    if (!this.sliderRef) {
      this.onEnd();
      return;
    }
    const position = getMousePosition(vertical, e);
    this.onMove(e, position - this.dragOffset);
  };

  addDocumentMouseEvents() {
    addEventListener(document, "mousemove", this.onMouseMove);
    addEventListener(document, "mouseup", this.onEnd);
  }

  handleRefs = {};
  sliderRef = null;

  saveHandle(index, node) {
    this.handleRefs[index] = node;
  }

  render() {
    const { domain, values, disabled = false } = this.props;
    this.scale.domain(domain);

    return (
      <div
        className="rc-slider"
        ref={node => (this.sliderRef = node)}
        onMouseDown={disabled ? noop : this.onMouseDown}
      >
        <div className="rc-slider-rail" />
        {values.map((value, index) => {
          if (index === 0 && values.length > 1) {
            return null;
          }

          if (index === 0) {
            return (
              <div
                key={`key-${value}`}
                className="rc-slider-track"
                style={{
                  left: "0%",
                  visibility: "visible",
                  width: `${this.scale(value)}%`
                }}
              />
            );
          }

          const prev = this.scale(values[index - 1]);
          const curr = this.scale(value);

          return (
            <div
              key={`key-${value}`}
              className="rc-slider-track"
              style={{
                backgroundColor: index === 1 ? "green" : "red",
                visibility: "visible",
                left: `${prev}%`,
                width: `${curr - prev}%`
              }}
            />
          );
        })}
        <div className="rc-slider-step" />
        {values.map((value, index) =>
          <div
            key={`key-${value}`}
            ref={node => this.saveHandle(index, node)}
            role="slider"
            tabIndex={index}
            aria-valuemin={domain[0]}
            aria-valuemax={domain[1]}
            aria-valuenow={value}
            aria-disabled="false"
            className="rc-slider-handle"
            style={{ left: `${this.scale(value)}%` }}
          />
        )}
        <div className="rc-slider-mark" />
      </div>
    );
  }
}

ScaledSlider.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  domain: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default ScaledSlider;
