import React, { PureComponent } from "react";
import PropTypes from "prop-types";

const styles = {
  position: "absolute",
  marginLeft: "-7px",
  marginTop: "-5px",
  width: "14px",
  height: "14px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "solid 2px #96dbfa",
  backgroundColor: "#fff",
  touchAction: "pan-x"
};

class Handle extends PureComponent {
  render() {
    const { index, value, scale } = this.props;
    const domain = scale.domain();

    return (
      <div
        role="slider"
        tabIndex={index}
        aria-valuemin={domain[0]}
        aria-valuemax={domain[1]}
        aria-valuenow={value}
        aria-disabled="false"
        style={{ ...styles, left: `${scale(value)}%` }}
      />
    );
  }
}

Handle.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  scale: PropTypes.func.isRequired
};

export default Handle;
