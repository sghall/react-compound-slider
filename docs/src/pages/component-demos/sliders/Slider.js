// @flow weak

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Range, ScaledSlider } from "react-electric-slide";
import Knob from "./Knob";
import Rail from "./Rail";
import Link from "./Link";
import Tick from "./Tick";
import "react-electric-slide/scss/slider.scss";

const styles = {
  form: {
    margin: "0 auto",
    padding: "100px 30px 0",
    width: "80%"
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

const style = { width: "100%", margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class Example extends React.Component {
  render() {
    const { props: { classes } } = this;

    return (
      <div style={style}>
        <div>
          <p>Scaled Slider (mode === 2)</p>
          <ScaledSlider
            knob={Knob}
            link={Link}
            rail={Rail}
            tick={Tick}
            mode={2}
            step={1}
            domain={[10, 80]}
            defaultValues={[
              { key: "cat", val: 20 },
              { key: "hat", val: 30 },
              { key: "dog", val: 60 }
            ]}
            className={classes.slider}
          />
        </div>
        <div>
          <p>Scaled Slider (mode === 1)</p>
          <ScaledSlider
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
          <p>Scaled Slider</p>
          <ScaledSlider
            knob={Knob}
            link={Link}
            rail={Rail}
            tick={Tick}
            domain={[20, 80]}
            defaultValues={[{ key: "cat", val: 30 }]}
            className={classes.slider}
          />
        </div>
        <div>
          <p>Basic Range，`allowCross=false`</p>
          <Range allowCross={false} defaultValue={[0, 20]} onChange={log} />
        </div>
        <div>
          <p>Basic Range，`step=20` </p>
          <Range step={20} defaultValue={[20, 20]} onBeforeChange={log} />
        </div>
        <div>
          <p>Basic Range，`step=20, dots` </p>
          <Range dots step={20} defaultValue={[20, 40]} onAfterChange={log} />
        </div>
        <div>
          <p>Basic Range，disabled</p>
          <Range
            allowCross={false}
            defaultValue={[0, 20]}
            onChange={log}
            disabled
          />
        </div>
        <div>
          <p>Multi Range</p>
          <Range count={3} defaultValue={[20, 40, 60, 80]} pushable />
        </div>
        <div>
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
