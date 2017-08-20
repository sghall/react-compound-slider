import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { updateValues } from "./utils";

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
    } else {
      this.position = 0;
      this.active = null;
      this.removeMouseEvents();
    }
  };

  onMouseMove = e => {
    const { vertical, values, domain, onChange } = this.props;
    const { active, scale } = this;

    const nxt = vertical ? e.clientY : e.pageX;
    const pct = (nxt - this.position) / this.getSliderLength();

    this.position = nxt;

    onChange(updateValues(active, pct, values, scale));
  };

  getSliderLength() {
    const { slider, props: { vertical = false } } = this;

    if (!slider) {
      return 0;
    }

    const rect = slider.getBoundingClientRect();
    return vertical ? rect.height : rect.width;
  }

  addMouseEvents() {
    document.addEventListener("mousemove", this.onMouseMove);
  }

  removeMouseEvents() {
    document.removeEventListener("mousemove", this.onMouseMove);
  }

  slider = null;
  handles = {};

  saveHandle(key, node) {
    this.handles[key] = { key, node };
  }

  render() {
    const { domain, values, disabled = false } = this.props;
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
