import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { scaleLinear, scaleQuantize } from "d3-scale";
import { precision, updateValues, getSliderLength } from "./utils";

const noop = () => {};

class ScaledSlider extends PureComponent {
  scale = scaleLinear().range([0, 100]).clamp(true);

  valueToStep = scaleQuantize();

  state = { values: [] };

  componentWillMount() {
    const { domain: [min, max], values, step } = this.props;
    const range = this.getStepRange(min, max, step);

    this.valueToStep.range(range).domain([min - step / 2, max + step / 2]);
    this.setState({ values });
  }

  getStepRange(min, max, step) {
    const fixed = precision(step);
    const range = [];

    let next = min;

    while (next <= max) {
      range.push(+next.toFixed(fixed));
      next += step;
    }

    return range;
  }

  onChange = values => {
    this.setState({ values });
  };

  onMouseDown = e => {
    const { handles, props: { vertical = false } } = this;

    e.stopPropagation();
    e.preventDefault();

    const active = Object.keys(handles).find(key => {
      return e.target === this.handles[key].node;
    });

    if (active) {
      this.position = vertical ? e.clientY : e.pageX;
      this.active = active;
      this.addMouseEvents();
    }
  };

  onMouseMove = e => {
    const { state: { values }, props: { vertical, domain } } = this;
    const { active, slider, scale } = this;

    const nxt = vertical ? e.clientY : e.pageX;
    const pct = (nxt - this.position) / getSliderLength(slider, vertical);

    this.position = nxt;

    this.onChange(updateValues(active, pct, values, scale));
  };

  onMouseUp = e => {
    this.removeMouseEvents();
  };

  addMouseEvents() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  removeMouseEvents() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  slider = null;
  handles = {};

  saveHandle(key, node) {
    this.handles[key] = { key, node: findDOMNode(node) };
  }

  render() {
    const {
      state: { values },
      props: {
        domain,
        disabled,
        knob: Knob,
        rail: Rail,
        link: Link,
        tick: Tick,
        className
      }
    } = this;

    this.scale.domain(domain);

    let ticks = this.scale.ticks();
    let links = null;

    if (Link) {
      links = [];

      for (let i = 0; i < values.length + 1; i++) {
        const s = values[i - 1];
        const t = values[i];

        links.push(
          <Link
            key={`${s ? s.key : "$"}-${t ? t.key : "$"}`}
            index={i}
            count={values.length}
            scale={this.scale}
            source={s || null}
            target={t || null}
          />
        );
      }
    }

    return (
      <div
        className={className}
        ref={node => (this.slider = node)}
        onMouseDown={disabled ? noop : this.onMouseDown}
      >
        <Rail />
        {links}
        <div className="rc-slider-step" />
        {values.map(({ key, val }, index) =>
          <Knob
            key={key}
            ref={node => this.saveHandle(key, node)}
            index={index}
            value={val}
            scale={this.scale}
          />
        )}
        {ticks.map((val, index) =>
          <Tick
            key={`key-${val}`}
            index={index}
            count={values.length}
            value={val}
            scale={this.scale}
          />
        )}
      </div>
    );
  }
}

ScaledSlider.propTypes = {
  knob: PropTypes.any.isRequired,
  link: PropTypes.any.isRequired,
  rail: PropTypes.any.isRequired,
  tick: PropTypes.any.isRequired,
  step: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  className: PropTypes.string.isRequired
};

ScaledSlider.defaultProps = {
  step: 0.1
};

export default ScaledSlider;
