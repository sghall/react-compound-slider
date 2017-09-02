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
        key: `${s ? s.key : "$"}-${t ? t.key : "$"}`,
        source: s || null,
        target: t || null
      });
    }

    const renderedChildren = children({ links, scale, values });
    return renderedChildren && React.Children.only(renderedChildren);
  }
}

Links.propTypes = {
  scale: PropTypes.func,
  values: PropTypes.array,
  children: PropTypes.func
};

export default Links;
