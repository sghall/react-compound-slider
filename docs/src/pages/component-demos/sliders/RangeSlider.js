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
import { RangeSlider } from "react-electric-slide";
import "react-electric-slide/scss/index.scss";

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

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 5,
      value2: 10,
      value3: 10,
      value4: {
        min: 5,
        max: 10
      },
      value5: {
        min: 3,
        max: 7
      }
    };
  }

  render() {
    return (
      <form className={this.props.classes.form}>
        <RangeSlider
          className={this.props.classes.slider}
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={value => this.setState({ value })}
          onChangeComplete={value => console.log(value)}
        />

        <RangeSlider
          maxValue={20}
          minValue={0}
          disabled
          value={this.state.value2}
          onChange={value => this.setState({ value })}
          onChangeComplete={value => console.log(value)}
        />

        <RangeSlider
          maxValue={20}
          minValue={0}
          formatLabel={value => value.toFixed(2)}
          value={this.state.value3}
          onChange={value => this.setState({ value3: value })}
          onChangeStart={value => console.log("onChangeStart =", value)}
          onChangeComplete={value => console.log(value)}
        />

        <RangeSlider
          maxValue={20}
          minValue={0}
          formatLabel={value => `${value}kg`}
          value={this.state.value4}
          onChange={value => this.setState({ value4: value })}
          onChangeComplete={value => console.log(value)}
        />

        <RangeSlider
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ value5: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.value5}
        />
      </form>
    );
  }
}

export default withStyles(styles)(Example);
