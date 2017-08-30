import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = ({ palette: { primary } }) => ({
  root: {
    position: "absolute",
    width: "8px",
    zIndex: 1,
    marginLeft: "-2px",
    borderRadius: "4px",
    backgroundColor: primary["700"]
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
            top: "0%",
            height: `${scale(target.val)}%`
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
          top: `${prev}%`,
          height: `${curr - prev}%`
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
