import React, { PureComponent } from "react";
import { scaleLinear } from "d3-dcale";

class ScaledSlider extends PureComponent {
  scale = scaleLinear();

  render() {
    return (
      <div className="rc-slider">
        <div className="rc-slider-rail" />
        <div
          className="rc-slider-track"
          style="visibility: visible; left: 0%; width: 0%;"
        />
        <div className="rc-slider-step" />
        <div
          role="slider"
          tabindex="0"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="0"
          aria-disabled="false"
          className="rc-slider-handle"
          style="left: 0%;"
        />
        <div className="rc-slider-mark" />
      </div>
    );
  }
}

export default ScaledSlider;
