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
