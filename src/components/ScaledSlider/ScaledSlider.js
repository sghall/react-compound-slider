import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";

class ScaledSlider extends PureComponent {
  scale = scaleLinear().range([0, 100]);

  render() {
    const { domain, values } = this.props;
    this.scale.domain(domain);

    return (
      <div className="rc-slider">
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
