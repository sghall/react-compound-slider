export function updateValues(active, pct, values, scale) {
  return values.map(item => {
    if (item.key === active) {
      const { key, val } = item;
      const [min, max] = scale.domain();

      return { key, val: scale.invert(scale(val + (max - min) * pct)) };
    }

    return item;
  });
}

export function getStepRange(min, max, step) {
  const fixed = precision(step);
  const range = [];

  let next = min;

  while (next <= max) {
    range.push(+next.toFixed(fixed));
    next += step;
  }

  return range;
}

export function getSliderLength(slider, vertical) {
  if (!slider) {
    return 0;
  }

  const rect = slider.getBoundingClientRect();
  return vertical ? rect.height : rect.width;
}

export function precision(num) {
  const m = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

  if (!m) {
    return 0;
  }

  return Math.max(0, (m[1] ? m[1].length : 0) - (m[2] ? +m[2] : 0));
}
