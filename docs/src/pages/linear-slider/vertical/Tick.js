import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = ({ palette: { primary, text } }) => ({
  tick: {
    position: "absolute",
    "margin-top": "0px",
    "margin-left": "10px",
    height: "2px",
    width: "5px",
    "background-color": primary["500"]
  },
  text: {
    position: "absolute",
    "margin-top": "-5px",
    "margin-left": "20px",
    "font-size": "10px",
    color: text.secondary
  }
});

class Tick extends PureComponent {
  render() {
    const { classes, index, count, value, scale } = this.props;
    const domain = scale.domain();

    return (
      <div>
        <div className={classes.tick} style={{ top: `${scale(value)}%` }} />
        <div
          className={classes.text}
          style={{
            top: `${scale(value)}%`
          }}
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
