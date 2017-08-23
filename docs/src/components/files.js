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

export const requireLinear = require.context(
  "../pages/linear-slider",
  true,
  /\.md$/
);

export const linear = requireLinear.keys().map(n => ({
  path: n,
  name: n.replace(/.*\//, "").replace(".md", "")
}));
