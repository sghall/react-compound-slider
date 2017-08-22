import React, { PureComponent } from "react";
import warning from "warning";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { scaleLinear, scaleQuantize } from "d3-scale";
import { getStepRange, updateValues, getSliderLength } from "./utils";

const noop = () => {};

class ScaledSlider extends PureComponent {
  scale = scaleLinear().range([0, 100]).clamp(true);

  valueToStep = scaleQuantize();

  state = { values: [] };

  componentWillMount() {
    const { domain: [min, max], defaultValues, step } = this.props;

    this.valueToStep
      .range(getStepRange(min, max, step))
      .domain([min - step / 2, max + step / 2]);

    this.setState(() => {
      const values = [];
      const pushed = {};

      defaultValues.forEach(val => {
        const v0 = this.valueToStep(val);

        warning(v0 === val, `Invalid default value. Changing ${val} to ${v0}`);

        if (pushed[v0]) {
          warning(false, `No duplicate values allowed. Skipping ${v0}`);
        } else {
          pushed[v0] = true;
          values.push({ key: `key-${v0}`, val: v0 });
        }
      });

      return { values };
    });
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
      this.marker = vertical ? e.clientY : e.pageX;
      this.offset = 0;
      this.active = active;
      this.addMouseEvents();
    }
  };

  onMouseMove = e => {
    const { state: { values }, props: { vertical, domain } } = this;
    const { active, slider, scale } = this;

    const pct = this.offset / getSliderLength(slider, vertical);
    const mrk = vertical ? e.clientY : e.pageX;
    const nxt = updateValues(active, pct, values, this.valueToStep, domain);

    if (nxt !== values) {
      this.offset = mrk - this.marker;
      this.onChange(nxt);
    } else {
      this.offset += mrk - this.marker;
    }

    this.marker = mrk;
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
        vertical,
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
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  defaultValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  className: PropTypes.string.isRequired
};

ScaledSlider.defaultProps = {
  step: 0.1
};

export default ScaledSlider;
