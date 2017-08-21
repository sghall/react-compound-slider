import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = ({ palette: { primary } }) => ({
  root: {
    position: "absolute",
    "margin-top": "14px",
    width: "1px",
    height: "5px",
    cursor: "pointer",
    cursor: "grab",
    "background-color": primary["100"],
    "touch-action": "pan-x"
  }
});

class Tick extends PureComponent {
  render() {
    const { classes, index, value, scale } = this.props;
    const domain = scale.domain();

    return (
      <div className={classes.root} style={{ left: `${scale(value)}%` }} />
    );
  }
}

Tick.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  scale: PropTypes.func.isRequired
};

export default withStyles(styles)(Tick);
