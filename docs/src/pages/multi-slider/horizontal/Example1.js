// @flow weak

import React, { Component } from "react";
import { Slider, Knobs, Links } from "react-electric-slide";
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
// KNOB COMPONENT (must be a component not a SFC!)
// *******************************************************
class Knob extends Component {
  onMouseDown = e => {
    const { handleMouseDown, knob: { key } } = this.props;
    handleMouseDown(e, key);
  };

  onTouchStart = e => {
    const { handleMouseDown, knob: { key } } = this.props;
    handleTouchStart(e, key);
  };

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
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
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
const defaultValues = [
  { key: "cat", val: 450 },
  { key: "hat", val: 400 },
  { key: "dog", val: 300 },
  { key: "bat", val: 150 }
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
        <Slider
          rootStyle={{
            position: "relative",
            width: "100%"
          }}
          mode={2}
          step={5}
          domain={[100, 500]}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          defaultValues={values}
        >
          <Rail />
          <Knobs>
            {({ values, scale, handleMouseDown, handleTouchStart }) => {
              return (
                <div className="slider-knobs">
                  {values.map(({ key, val }, index) => {
                    return (
                      <Knob
                        key={key}
                        knob={{ key, val }}
                        value={val}
                        index={index}
                        scale={scale}
                        handleMouseDown={handleMouseDown}
                        handleTouchStart={handleTouchStart}
                      />
                    );
                  })}
                </div>
              );
            }}
          </Knobs>
          <Links>
            {({ links, scale }) => {
              return (
                <div className="slider-links">
                  {links.map((link, index) => {
                    return (
                      <Link
                        key={link.key}
                        source={link.source}
                        target={link.target}
                        index={index}
                        scale={scale}
                      />
                    );
                  })}
                </div>
              );
            }}
          </Links>
        </Slider>
      </div>
    );
  }
}

export default Example;
