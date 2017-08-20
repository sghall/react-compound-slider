export function updateValues(active, pct, values, scale) {
  return values.map(item => {
    if (item.key === active) {
      const { key, value } = item;
      const [min, max] = scale.domain();

      return { key, value: scale.invert(scale(value + (max - min) * pct)) };
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
