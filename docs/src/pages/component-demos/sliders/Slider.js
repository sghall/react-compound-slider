// @flow weak

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Range, ScaledSlider } from "react-electric-slide";
import Knob from "./Knob";
import Rail from "./Rail";
import Link from "./Link";
import "react-electric-slide/scss/slider.scss";

const styles = {
  form: {
    margin: "0 auto",
    padding: "100px 30px 0",
    width: "60%"
  },
  slider: {
    position: "relative",
    height: "14px",
    padding: "5px 0",
    width: "100%",
    "border-radius": "6px",
    "touch-action": "none",
    "box-sizing": "border-box",
    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
    "margin-bottom": "50px"
  }
};

const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class Example extends React.Component {
  render() {
    const { props: { classes } } = this;

    return (
      <div>
        <div style={style}>
          <p>Scaled Slider</p>
          <ScaledSlider
            knob={Knob}
            link={Link}
            rail={Rail}
            domain={[20, 80]}
            values={[
              { key: "dog", val: 30 },
              { key: "cat", val: 40 },
              { key: "hat", val: 70 }
            ]}
            className={classes.slider}
          />
        </div>
        <div style={style}>
          <p>Scaled Slider</p>
          <ScaledSlider
            knob={Knob}
            link={Link}
            rail={Rail}
            domain={[20, 80]}
            values={[{ key: "dog", val: 30 }]}
            className={classes.slider}
          />
        </div>
        <div style={style}>
          <p>Basic Range，`allowCross=false`</p>
          <Range allowCross={false} defaultValue={[0, 20]} onChange={log} />
        </div>
        <div style={style}>
          <p>Basic Range，`step=20` </p>
          <Range step={20} defaultValue={[20, 20]} onBeforeChange={log} />
        </div>
        <div style={style}>
          <p>Basic Range，`step=20, dots` </p>
          <Range dots step={20} defaultValue={[20, 40]} onAfterChange={log} />
        </div>
        <div style={style}>
          <p>Basic Range，disabled</p>
          <Range
            allowCross={false}
            defaultValue={[0, 20]}
            onChange={log}
            disabled
          />
        </div>
        <div style={style}>
          <p>Multi Range</p>
          <Range count={3} defaultValue={[20, 40, 60, 80]} pushable />
        </div>
        <div style={style}>
          <p>Multi Range with custom track and handle style</p>
          <Range
            count={3}
            defaultValue={[20, 40, 60, 80]}
            pushable
            trackStyle={[
              { backgroundColor: "red" },
              { backgroundColor: "green" }
            ]}
            handleStyle={[
              { backgroundColor: "yellow" },
              { backgroundColor: "gray" }
            ]}
            railStyle={{ backgroundColor: "black" }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Example);
