// @flow weak

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import { Range, ScaledSlider } from "react-electric-slide";
import "react-electric-slide/scss/slider.scss";

const styles = {
  form: {
    margin: "0 auto",
    padding: "100px 30px 0",
    width: "60%"
  },
  slider: {
    "margin-bottom": "160px"
  }
};

const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    values: [
      { key: "dog", value: 30 },
      { key: "cat", value: 40 },
      { key: "hat", value: 70 }
    ]
  };

  onChange = values => {
    this.setState({ values });
  };

  render() {
    const { values } = this.state;

    return (
      <div>
        <div style={style}>
          <p>Scaled Slider</p>
          <ScaledSlider
            domain={[20, 80]}
            values={values}
            onChange={this.onChange}
          />
        </div>
        <div style={style}>
          <p>Scaled Slider</p>
          <ScaledSlider
            domain={[20, 80]}
            values={[{ key: "dog", value: 30 }]}
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
