// @flow weak

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { ScaledSlider } from "react-electric-slide";
import Knob from "./Knob";
import Rail from "./Rail";
import Link from "./Link";
import Tick from "./Tick";

const styles = {
  slider: {
    position: "relative",
    width: "80%"
  },
  container: {
    textAlign: "center",
    width: "100%",
    display: "flex"
  },
  item: {
    flexGrow: 1
  }
};

class Example extends React.Component {
  state = {
    values: [
      { key: "cat", val: 100 },
      { key: "hat", val: 200 },
      { key: "dog", val: 500 },
      { key: "bat", val: 900 }
    ],
    update: []
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
      <div className={classes.container}>
        <div className={classes.item}>
          <p>mode 2</p>
          <div className={classes.container}>
            {values.map(d =>
              <div className={classes.item}>
                {d.val}
              </div>
            )}
          </div>
          {update.map(d => d.val).toString()}
          <ScaledSlider
            knob={Knob}
            link={Link}
            rail={Rail}
            tick={Tick}
            mode={2}
            step={10}
            domain={[0, 1000]}
            onUpdate={this.onUpdate}
            onChange={this.onChange}
            defaultValues={values}
            className={classes.slider}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Example);
