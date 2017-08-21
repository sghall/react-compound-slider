import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = ({ palette: { primary } }) => ({
  root: {
    position: "absolute",
    top: "3px",
    height: "8px",
    "background-color": primary["700"],
    "border-radius": "6px"
  }
});

class Link extends PureComponent {
  render() {
    const { classes, index, scale, count, source, target } = this.props;

    if ((index === 0 && count > 1) || !target) {
      return null;
    }

    if (index === 0) {
      return (
        <div
          className={classes.root}
          style={{
            left: "0%",
            width: `${scale(target.val)}%`
          }}
        />
      );
    }

    const prev = scale(source.val);
    const curr = scale(target.val);

    return (
      <div
        className={classes.root}
        style={{
          left: `${prev}%`,
          width: `${curr - prev}%`
        }}
      />
    );
  }
}

Link.propTypes = {
  index: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  scale: PropTypes.func.isRequired,
  source: PropTypes.shape({
    key: PropTypes.string.isRequired,
    val: PropTypes.number.isRequired
  }),
  target: PropTypes.shape({
    key: PropTypes.string.isRequired,
    val: PropTypes.number.isRequired
  })
};

export default withStyles(styles)(Link);
