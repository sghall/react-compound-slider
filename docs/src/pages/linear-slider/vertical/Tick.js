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
    "background-color": primary["500"],
    "touch-action": "pan-x"
  },
  text: {
    position: "absolute",
    display: "table-cell",
    "margin-left": "22px",
    "font-size": "10px",
    "vertical-align": "middle",
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
            height: `${100 / count}%`,
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
