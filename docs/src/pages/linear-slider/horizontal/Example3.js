// @flow weak

import React, { Component } from "react";
import { ScaledSlider } from "react-electric-slide";
import ValueViewer from "../ValueViewer";

// *******************************************************
// RAIL COMPONENT
// *******************************************************
const Rail = () =>
  <div
    style={{
      position: "absolute",
      width: "100%",
      height: "4px",
      borderRadius: "2px",
      backgroundColor: "rgb(155,155,155)"
    }}
  />;

// *******************************************************
// LINK COMPONENT
// *******************************************************
const Link = ({ source, target, index, scale }) => {
  if (!target) {
    return null;
  }

  const p1 = scale(target.val);

  return (
    <div
      style={{
        position: "absolute",
        top: "-1px",
        height: "8px",
        zIndex: 1,
        backgroundColor: "#455a64",
        borderRadius: "6px",
        left: "0%",
        width: `${p1}%`
      }}
    />
  );
};

// *******************************************************
// KNOB COMPONENT (must be a component not a SFC!)
// *******************************************************
class Knob extends Component {
  render() {
    const { value, index, scale } = this.props;
    const domain = scale.domain();

    return (
      <div
        role="slider"
        tabIndex={index}
        aria-valuemin={domain[0]}
        aria-valuemax={domain[1]}
        aria-valuenow={value}
        style={{
          left: `${scale(value)}%`,
          position: "absolute",
          marginLeft: "-12px",
          marginTop: "-10px",
          zIndex: 2,
          width: "24px",
          height: "24px",
          cursor: "pointer",
          borderRadius: "50%",
          border: "solid 4px rgb(200,200,200)",
          backgroundColor: "#455a64"
        }}
      />
    );
  }
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
const Tick = ({ value, index, count, scale }) => {
  const domain = scale.domain();

  return (
    <div>
      <div
        style={{
          position: "absolute",
          marginTop: "14px",
          marginLeft: "-0.5px",
          width: "1px",
          height: "5px",
          backgroundColor: "rgb(200,200,200)",
          left: `${scale(value)}%`
        }}
      />
      <div
        style={{
          position: "absolute",
          marginTop: "22px",
          fontSize: "10px",
          textAlign: "center",
          color: "white",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${scale(value)}%`
        }}
      >
        {value}
      </div>
    </div>
  );
};

// *******************************************************
// SLIDER EXAMPLE
// *******************************************************
const defaultValues = [{ key: "cat", val: 320 }];

class Example extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice()
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
      <div style={{ height: 120, width: "100%" }}>
        <ValueViewer values={values} update={update} />
        <ScaledSlider
          rootStyle={{
            position: "relative",
            width: "100%"
          }}
          mode={2}
          step={10}
          domain={[100, 500]}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          defaultValues={values}
          knobComponent={<Knob />}
          linkComponent={<Link />}
          railComponent={<Rail />}
          tickComponent={<Tick />}
        />
      </div>
    );
  }
}

export default Example;
