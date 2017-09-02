import React, { Component } from "react";
import PropTypes from "prop-types";

class Ticks extends Component {
  render() {
    const { scale, values, children } = this.props;
    const renderedChildren = children(scale, values);

    return renderedChildren && React.Children.only(renderedChildren);
  }
}

Ticks.propTypes = {
  scale: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired
};

export default Ticks;
