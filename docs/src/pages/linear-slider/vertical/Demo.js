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
    "margin-left": "50%",
    position: "relative",
    height: "400px"
  },
  container: {
    "text-align": "center",
    width: "100%",
    display: "flex"
  },
  item: {
    "flex-grow": 1
  }
};

const style = { width: "20%", margin: 5 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class Example extends React.Component {
  render() {
    const { props: { classes } } = this;

    return (
      <div className={classes.container}>
        <div className={classes.item}>
          <p>Scaled Slider</p>
          <p>(mode === 2)</p>
          <ScaledSlider
            vertical
            knob={Knob}
            link={Link}
            rail={Rail}
            tick={Tick}
            mode={2}
            step={0.01}
            domain={[0, 1]}
            defaultValues={[
              { key: "cat", val: 0.2 },
              { key: "hat", val: 0.3 },
              { key: "dog", val: 0.7 },
              { key: "bat", val: 0.9 }
            ]}
            className={classes.slider}
          />
        </div>
        <div className={classes.item}>
          <p>Scaled Slider</p>
          <p>(mode === 2)</p>
          <ScaledSlider
            vertical
            knob={Knob}
            link={Link}
            rail={Rail}
            tick={Tick}
            mode={2}
            step={5}
            domain={[0, 100]}
            defaultValues={[{ key: "cat", val: 10 }, { key: "hat", val: 20 }]}
            className={classes.slider}
          />
        </div>
        <div className={classes.item}>
          <p>Scaled Slider</p>
          <p>(mode === 1)</p>
          <ScaledSlider
            vertical
            knob={Knob}
            link={Link}
            rail={Rail}
            tick={Tick}
            mode={1}
            step={5}
            domain={[10, 80]}
            defaultValues={[
              { key: "cat", val: 10 },
              { key: "hat", val: 20 },
              { key: "dog", val: 70 }
            ]}
            className={classes.slider}
          />
        </div>
        <div className={classes.item}>
          <p>Scaled Slider</p>
          <p>(mode === 2)</p>
          <ScaledSlider
            vertical
            knob={Knob}
            link={Link}
            rail={Rail}
            tick={Tick}
            domain={[20, 80]}
            defaultValues={[{ key: "cat", val: 30 }]}
            className={classes.slider}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Example);
