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
    const { handles, props: { vertical = false } } = this;

    const handle =
      handles[
        Object.keys(handles).find(key => {
          return e.target === this.handles[key];
        })
      ];

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

  handles = {};
  sliderRef = null;

  saveHandle(index, node) {
    this.handles[index] = node;
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
        {values.map(({ value }, index) => {
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

          const prev = this.scale(values[index - 1].value);
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
        {values.map(({ key, value }, index) =>
          <div
            key={key}
            ref={node => this.saveHandle(key, node)}
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
