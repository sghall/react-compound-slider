// @flow

import warning from "warning";
import deepmerge from "deepmerge";

function getStylesCreator(stylesOrCreator) {
  function create(theme) {
    return typeof stylesOrCreator === "function"
      ? stylesOrCreator(theme)
      : stylesOrCreator;
  }

  return {
    create,
    options: {
      index: undefined
    },
    themingEnabled: typeof stylesOrCreator === "function"
  };
}

export default getStylesCreator;
