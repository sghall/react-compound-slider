// @flow

export const requireMarkdown = require.context(
  "../pages",
  true,
  /^((?![\\/]component-demos[\\/]).)*\.md$/
);

export const componentAPIs = requireMarkdown.keys().reduce((res, n) => {
  if (/^\.\/component-api\//.test(n)) {
    res.push({
      path: n,
      name: n.replace(/.*\//, "").replace(".md", "")
    });
  }
  return res;
}, []);

// ********************************************************
// VALUE SLIDER EXAMPLES
// ********************************************************
export const requireValueSlider = require.context(
  "../pages/value-slider",
  true,
  /\.md$/
);

export const valueSlider = requireValueSlider.keys().map(n => ({
  path: n,
  name: n.replace(/.*\//, "").replace(".md", "")
}));

// ********************************************************
// RANGE SLIDER EXAMPLES
// ********************************************************
export const requireRangeSlider = require.context(
  "../pages/range-slider",
  true,
  /\.md$/
);

export const rangeSlider = requireRangeSlider.keys().map(n => ({
  path: n,
  name: n.replace(/.*\//, "").replace(".md", "")
}));

// ********************************************************
// MULTI SLIDER EXAMPLES
// ********************************************************
export const requireMultiSlider = require.context(
  "../pages/multi-slider",
  true,
  /\.md$/
);

export const multiSlider = requireMultiSlider.keys().map(n => ({
  path: n,
  name: n.replace(/.*\//, "").replace(".md", "")
}));
