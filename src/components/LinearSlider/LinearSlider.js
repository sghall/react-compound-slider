import React, { PureComponent } from "react";
import warning from "warning";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import scaleLinear from "d3-scale/src/linear";
import scaleQuantize from "d3-scale/src/quantize";
import { mode1, mode2 } from "./modes";
import { getStepRange, updateValues, getSliderDomain } from "./utils";

const noop = () => {};

class ScaledSlider extends PureComponent {
  scale = scaleLinear().range([0, 100]).clamp(true);

  valueToStep = scaleQuantize();
  pixelToStep = scaleQuantize();

  state = { values: [] };

  componentWillMount() {
    const { domain: [min, max], defaultValues, step } = this.props;
    const range = getStepRange(min, max, step);

    this.valueToStep.range(range).domain([min - step / 2, max + step / 2]);
    this.pixelToStep.range(range);

    warning(
      range.length <= 10001,
      `React Electric Slide: Increase step value. Found ${range.length.toLocaleString()} values in range.`
    );

    warning(
      range[0] === min && range[range.length - 1] === max,
      `React Electric Slide: The range is incorrectly calculated. Consider changing step value.`
    );

    this.setState(() => {
      const values = [];
      const pushed = {};

      defaultValues.forEach(({ key, val }) => {
        const v0 = this.valueToStep(val);

        warning(
          v0 === val,
          `React Electric Slide: Invalid default value. Changing ${val} to ${v0}.`
        );

        warning(
          !pushed[key],
          `React Electric Slide: No duplicate keys allowed. Skipping "${key}" key.`
        );

        if (!pushed[key]) {
          pushed[key] = true;
          values.push({ key, val: v0 });
        }
      });

      return { values };
    });
  }

  onMouseDown = e => {
    const { handles } = this;

    e.stopPropagation();
    e.preventDefault();

    const active = Object.keys(handles).find(key => {
      return e.target === handles[key].node;
    });

    if (active) {
      this.active = active;
      this.addMouseEvents();
    }
  };

  onMouseMove = e => {
    const {
      state: { values: prev },
      props: { vertical, domain, mode, onUpdate }
    } = this;
    const { active, slider } = this;

    this.pixelToStep.domain(getSliderDomain(slider, vertical));

    const step = this.pixelToStep(vertical ? e.clientY : e.pageX);
    const next = updateValues(prev, active, step);

    if (next !== prev) {
      let values;

      switch (mode) {
        case 1:
          values = mode1(prev, next);
          break;
        case 2:
          values = mode2(prev, next);
          break;
        default:
          values = next;
          warning(false, "React Electric Slide: Invalid mode value.");
      }

      onUpdate(values);
      this.setState({ values });
    }
  };

  onMouseUp = () => {
    const { state: { values }, props: { onChange } } = this;
    onChange(values);
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

  onTouchStart = e => {
    const { handles } = this;

    if (this.isNotValidTouch(e)) return;

    e.stopPropagation();
    e.preventDefault();

    const active = Object.keys(handles).find(key => {
      return e.target === handles[key].node;
    });

    if (active) {
      this.active = active;
      this.addTouchEvents();
    }
  };

  onTouchMove = e => {
    const { state: { values: prev }, props: { vertical, domain, mode } } = this;
    const { active, slider } = this;

    if (this.isNotValidTouch(e)) return;

    this.pixelToStep.domain(getSliderDomain(slider, vertical));

    const step = this.pixelToStep(this.getTouchPosition(vertical, e));
    const next = updateValues(prev, active, step);

    if (next !== prev) {
      let values;

      switch (mode) {
        case 1:
          values = mode1(prev, next);
          break;
        case 2:
          values = mode2(prev, next);
          break;
        default:
          values = next;
          warning(false, "React Electric Slide: Invalid mode value.");
      }

      this.setState({ values });
    }
  };

  onTouchEnd = () => {
    const { state: { values }, props: { onChange } } = this;
    onChange(values);
    this.removeTouchEvents();
  };

  isNotValidTouch({ type, touches: { length } }) {
    return length > 1 || (type.toLowerCase() === "touchend" && length > 0);
  }

  getTouchPosition(vertical, e) {
    return vertical ? e.touches[0].clientY : e.touches[0].pageX;
  }

  addTouchEvents() {
    document.addEventListener("touchmove", this.onTouchMove);
    document.addEventListener("touchend", this.onTouchEnd);
  }

  removeTouchEvents() {
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onTouchEnd);
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
        vertical,
        disabled,
        className,
        rootStyle,
        knobComponent: Knob,
        railComponent: Rail,
        linkComponent: Link,
        tickComponent: Tick
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
          React.cloneElement(Link, {
            key: `${s ? s.key : "$"}-${t ? t.key : "$"}`,
            index: i,
            count: values.length,
            scale: this.scale,
            source: s || null,
            target: t || null
          })
        );
      }
    }

    return (
      <div
        style={rootStyle || {}}
        className={className}
        ref={node => (this.slider = node)}
        onTouchStart={disabled ? noop : this.onTouchStart}
        onMouseDown={disabled ? noop : this.onMouseDown}
      >
        {React.cloneElement(Rail, { vertical, disabled })}
        {links}
        {values.map(({ key, val: value }, index) =>
          React.cloneElement(Knob, {
            ref: node => this.saveHandle(key, node),
            key,
            index,
            value,
            scale: this.scale
          })
        )}
        {ticks.map((value, index) =>
          React.cloneElement(Tick, {
            key: `key-${value}`,
            value,
            index,
            count: values.length,
            scale: this.scale
          })
        )}
      </div>
    );
  }
}

ScaledSlider.propTypes = {
  step: PropTypes.number.isRequired,
  mode: PropTypes.oneOf([1, 2]).isRequired,
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  vertical: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  rootStyle: PropTypes.object,
  knobComponent: PropTypes.element,
  linkComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  railComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  tickComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  defaultValues: PropTypes.arrayOf(PropTypes.object).isRequired
};

ScaledSlider.defaultProps = {
  mode: 1,
  step: 0.1,
  vertical: false,
  disabled: false,
  onUpdate: noop,
  onChange: noop
};

export default ScaledSlider;
