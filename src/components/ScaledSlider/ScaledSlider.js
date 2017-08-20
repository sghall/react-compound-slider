import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { updateValues, getSliderLength } from "./utils";

const noop = () => {};

class ScaledSlider extends PureComponent {
  scale = scaleLinear().range([0, 100]).clamp(true);

  onMouseDown = e => {
    const { handles, props: { vertical = false } } = this;

    e.stopPropagation();
    e.preventDefault();

    const active = Object.keys(handles).find(key => {
      return e.target === this.handles[key].node;
    });

    if (active) {
      this.position = vertical ? e.clientY : e.pageX;
      this.active = active;
      this.addMouseEvents();
    }
  };

  onMouseMove = e => {
    const { vertical, values, domain, onChange } = this.props;
    const { active, slider, scale } = this;

    const nxt = vertical ? e.clientY : e.pageX;
    const pct = (nxt - this.position) / getSliderLength(slider, vertical);

    this.position = nxt;

    onChange(updateValues(active, pct, values, scale));
  };

  onMouseUp = e => {
    this.removeMouseEvents();
  };

  addMouseEvents() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  removeMouseEvents() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  slider = null;
  handles = {};

  saveHandle(key, node) {
    this.handles[key] = { key, node: findDOMNode(node) };
  }

  render() {
    const { domain, values, disabled, Handle } = this.props;
    this.scale.domain(domain);

    return (
      <div
        className="rc-slider"
        ref={node => (this.slider = node)}
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
          <Handle
            key={key}
            ref={node => this.saveHandle(key, node)}
            index={index}
            value={value}
            scale={this.scale}
          />
        )}
        <div className="rc-slider-mark" />
      </div>
    );
  }
}

ScaledSlider.propTypes = {
  Handle: PropTypes.any.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  domain: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default ScaledSlider;
