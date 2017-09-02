import React, { Component } from "react";
import PropTypes from "prop-types";

class Links extends Component {
  render() {
    const { scale, values, children } = this.props;
    const links = [];

    for (let i = 0; i < values.length + 1; i++) {
      const s = values[i - 1];
      const t = values[i];

      links.push({
        source: s || null,
        target: t || null
      });
    }

    const renderedChildren = children(scale, links, values);
    return renderedChildren && React.Children.only(renderedChildren);
  }
}

Links.propTypes = {
  scale: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired
};

export default Links;
