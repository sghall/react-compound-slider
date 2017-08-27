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
  form: {
    margin: "0 auto",
    padding: "100px 30px 0",
    width: "80%"
  },
  slider: {
    position: "relative",
    height: "14px",
    height: "400px",
    "margin-left": "10%",
    "border-radius": "6px",
    "touch-action": "none",
    "box-sizing": "border-box",
    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
    "margin-bottom": "50px"
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
      <div style={style}>
        <div>
          <p style={{ marginLeft: "10%" }}>Scaled Slider (mode === 2)</p>
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
        <div>
          <p style={{ marginLeft: "10%" }}>Scaled Slider (mode === 2)</p>
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
        <div>
          <p style={{ marginLeft: "10%" }}>Scaled Slider (mode === 1)</p>
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
        <div>
          <p style={{ marginLeft: "10%" }}>Scaled Slider</p>
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
