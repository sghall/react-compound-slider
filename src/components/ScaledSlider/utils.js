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

export function getSliderLength(slider, vertical) {
  if (!slider) {
    return 0;
  }

  const rect = slider.getBoundingClientRect();
  return vertical ? rect.height : rect.width;
}

export function precision(a) {
  var match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }

  return Math.max(
    0,
    (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)
  );
}
