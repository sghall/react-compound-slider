// @flow weak

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { ScaledSlider } from "react-electric-slide";
import ValueViewer from "./ValueViewer";

import Knob from "./Knob";
import Rail from "./Rail";
import Link from "./Link";
import Tick from "./Tick";

const styles = {
  slider: {
    position: "relative",
    width: "100%"
  }
};

const defaultValues = [
  { key: "cat", val: 100 },
  { key: "hat", val: 200 },
  { key: "dog", val: 400 },
  { key: "bat", val: 450 }
];

class Example extends React.Component {
  state = {
    values: defaultValues,
    update: defaultValues
  };

  onUpdate = update => {
    this.setState({ update });
  };

  onChange = values => {
    this.setState({ values });
  };

  render() {
    const { state: { values, update }, props: { classes } } = this;

    return (
      <div style={{ height: 100, width: "100%" }}>
        <ValueViewer values={values} update={update} />
        <ScaledSlider
          rootStyle={{
            position: "relative",
            width: "100%"
          }}
          knob={Knob}
          link={Link}
          rail={Rail}
          tick={Tick}
          mode={2}
          step={10}
          domain={[100, 500]}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          defaultValues={values}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Example);
