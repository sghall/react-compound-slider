import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = ({ palette: { primary } }) => ({
  root: {
    position: "absolute",
    "margin-left": "-10px",
    "margin-top": "-8px",
    "z-index": 2,
    width: "20px",
    height: "20px",
    cursor: "pointer",
    cursor: "grab",
    "border-radius": "50%",
    border: `solid 3px ${primary["200"]}`,
    "background-color": primary["500"],
    "touch-action": "pan-x",

    "&:hover": {
      "border-color": primary["100"]
    },

    "&:active": {
      "border-color": primary["200"],
      "box-shadow": "0 0 5px #57c5f7",
      cursor: "grabbing"
    },

    "&:focus": {
      "border-color": primary["300"],
      "box-shadow": "0 0 0 5px #96dbfa",
      outline: "none"
    }
  }
});

class Knob extends PureComponent {
  render() {
    const { classes, index, value, scale } = this.props;
    const domain = scale.domain();

    return (
      <div
        role="slider"
        tabIndex={index}
        className={classes.root}
        aria-valuemin={domain[0]}
        aria-valuemax={domain[1]}
        aria-valuenow={value}
        aria-disabled="false"
        style={{ top: `${scale(value)}%` }}
      />
    );
  }
}

Knob.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  scale: PropTypes.func.isRequired
};

export default withStyles(styles)(Knob);
