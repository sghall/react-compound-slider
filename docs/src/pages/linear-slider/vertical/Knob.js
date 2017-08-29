import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = ({ palette: { primary } }) => ({
  root: {
    position: "absolute",
    marginLeft: "-8px",
    marginTop: "-10px",
    zIndex: 2,
    width: "20px",
    height: "20px",
    cursor: "pointer",
    cursor: "grab",
    borderRadius: "50%",
    border: `solid 4px ${primary["200"]}`,
    backgroundColor: primary["500"],

    "&:hover": {
      borderColor: primary["100"]
    },

    "&:active": {
      borderColor: primary["200"],
      cursor: "grabbing"
    },

    "&:focus": {
      borderColor: primary["300"]
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
