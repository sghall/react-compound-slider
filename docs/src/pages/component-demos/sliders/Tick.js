import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = ({ palette: { primary, text } }) => ({
  tick: {
    position: "absolute",
    "margin-top": "14px",
    width: "1px",
    height: "5px",
    "background-color": primary["500"],
    "touch-action": "pan-x"
  },
  text: {
    position: "absolute",
    "margin-top": "18px",
    "font-size": "8px",
    color: text.secondary
  }
});

class Tick extends PureComponent {
  render() {
    const { classes, index, count, value, scale } = this.props;
    const domain = scale.domain();

    return (
      <div>
        <div className={classes.tick} style={{ left: `${scale(value)}%` }} />
        <div
          className={classes.text}
          style={{ width: `${100 / count}%`, left: `${scale(value)}%` }}
        >
          {value}
        </div>
      </div>
    );
  }
}

Tick.propTypes = {
  index: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  scale: PropTypes.func.isRequired
};

export default withStyles(styles)(Tick);
