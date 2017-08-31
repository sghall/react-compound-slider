// @flow weak

import React, { Component } from "react";
import { ScaledSlider } from "react-electric-slide";
import ValueViewer from "./ValueViewer";

import Tick from "./Tick";

// *******************************************************
// RAIL RENDERER
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
// LINK RENDERER
// *******************************************************
const Link = ({ source, target, index, scale }) => {
  if (!source || !target) {
    return null;
  }

  const p0 = scale(source.val);
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
        left: `${p0}%`,
        width: `${p1 - p0}%`
      }}
    />
  );
};

// *******************************************************
// KNOB RENDERER (must be a component not a SFC!)
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
          marginLeft: "-10px",
          marginTop: "-8px",
          zIndex: 2,
          width: "20px",
          height: "20px",
          cursor: "pointer",
          borderRadius: "50%",
          border: "solid 4px rgb(200,200,200)",
          backgroundColor: "#455a64"
        }}
      />
    );
  }
}

const defaultValues = [
  { key: "cat", val: 150 },
  { key: "hat", val: 200 },
  { key: "dog", val: 400 },
  { key: "bat", val: 450 }
];

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
