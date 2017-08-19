// @flow weak

import { Component } from "react";
import PropTypes from "prop-types";
import warning from "warning";
import hoistNonReactStatics from "hoist-non-react-statics";
import wrapDisplayName from "recompose/wrapDisplayName";
import createEagerFactory from "recompose/createEagerFactory";
import getDisplayName from "recompose/getDisplayName";
import contextTypes from "react-jss/lib/contextTypes";
import jss from "react-jss/lib/jss";
import * as ns from "react-jss/lib/ns";
import createTheme from "./theme";
import themeListener from "./themeListener";
import createGenerateClassName from "./createGenerateClassName";
import getStylesCreator from "./getStylesCreator";

const generateClassName = createGenerateClassName();

let indexCounter = Number.MIN_SAFE_INTEGER;

export const sheetsManager = new Map();

let defaultTheme;

function getDefaultTheme() {
  if (defaultTheme) {
    return defaultTheme;
  }

  defaultTheme = createTheme();
  return defaultTheme;
}

const withStyles = (stylesOrCreator, options = {}) => BaseComponent => {
  const { name, ...styleSheetOptions } = options;
  const factory = createEagerFactory(BaseComponent);
  const stylesCreators = [getStylesCreator(stylesOrCreator)];
  const listenToTheme = true;

  stylesCreators.forEach(stylesCreator => {
    if (stylesCreator.options.index === undefined) {
      indexCounter += 1;
      stylesCreator.options.index = indexCounter;
    }
  });

  warning(
    indexCounter < 0,
    [
      "You might have a memory leak.",
      "The indexCounter is not supposed to grow that much."
    ].join(" ")
  );

  class Style extends Component {
    constructor(props, context) {
      super(props, context);

      this.jss = this.context[ns.jss] || jss;

      this.sheetsManager = this.context.sheetsManager || sheetsManager;
      this.stylesCreators = stylesCreators;

      this.sheetOptions = {
        generateClassName,
        ...this.context[ns.sheetOptions]
      };

      this.theme = themeListener.initial(context) || getDefaultTheme();
      this.state = {};
    }

    componentWillMount() {
      this.attach(this.theme);
    }

    componentDidMount() {
      if (!listenToTheme) {
        return;
      }

      this.unsubscribeId = themeListener.subscribe(this.context, theme => {
        const oldTheme = this.theme;
        this.theme = theme;
        this.attach(this.theme);

        // Rerender the component so the underlying component gets the theme update.
        this.setState({}, () => {
          this.detach(oldTheme);
        });
      });
    }

    componentWillUnmount() {
      this.detach(this.theme);

      if (this.unsubscribeId !== null) {
        themeListener.unsubscribe(this.context, this.unsubscribeId);
      }
    }

    attach(theme) {
      this.stylesCreators.forEach(stylesCreator => {
        let sheetManager = this.sheetsManager.get(stylesCreator);

        if (!sheetManager) {
          sheetManager = new Map();
          this.sheetsManager.set(stylesCreator, sheetManager);
        }

        let sheetManagerTheme = sheetManager.get(theme);

        if (!sheetManagerTheme) {
          sheetManagerTheme = {
            refs: 0,
            sheet: null
          };
          sheetManager.set(theme, sheetManagerTheme);
        }

        if (sheetManagerTheme.refs === 0) {
          const styles = stylesCreator.create(theme, name);
          let meta;

          if (process.env.NODE_ENV !== "production") {
            meta = name || getDisplayName(BaseComponent);
            meta = meta.replace(
              new RegExp(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g),
              "-"
            );
          }

          const sheet = this.jss.createStyleSheet(styles, {
            meta,
            link: false,
            ...this.sheetOptions,
            ...stylesCreator.options,
            name,
            ...styleSheetOptions
          });

          sheetManagerTheme.sheet = sheet;
          sheet.attach();

          const sheetsRegistry = this.context[ns.sheetsRegistry];
          if (sheetsRegistry) {
            sheetsRegistry.add(sheet);
          }
        }

        sheetManagerTheme.refs += 1;
      });
    }

    detach(theme) {
      this.stylesCreators.forEach(stylesCreator => {
        const sheetManager = this.sheetsManager.get(stylesCreator);
        const sheetManagerTheme = sheetManager.get(theme);

        sheetManagerTheme.refs -= 1;

        if (sheetManagerTheme.refs === 0) {
          sheetManager.delete(theme);
          sheetManagerTheme.sheet.detach();
          const sheetsRegistry = this.context[ns.sheetsRegistry];
          if (sheetsRegistry) {
            sheetsRegistry.remove(sheetManagerTheme.sheet);
          }
        }
      });
    }

    unsubscribeId = null;
    jss = null;
    sheetsManager = null;
    stylesCreators = null;
    theme = null;
    sheetOptions = null;
    theme = null;

    render() {
      const { classes: classesProp, innerRef, ...other } = this.props;

      let classes;

      const renderedClasses = this.stylesCreators.reduce(
        (accumulator, current) => {
          const sheetManager = this.sheetsManager.get(current);
          const sheetsManagerTheme = sheetManager.get(this.theme);

          return {
            ...accumulator,
            ...sheetsManagerTheme.sheet.classes
          };
        },
        {}
      );

      if (classesProp) {
        classes = {
          ...renderedClasses,
          ...Object.keys(classesProp).reduce((accumulator, key) => {
            warning(
              renderedClasses[key],
              [
                `The key \`${key}\` ` +
                  `provided to the classes property object is not implemented in ${getDisplayName(
                    BaseComponent
                  )}.`,
                `You can only override one of the following: ${Object.keys(
                  renderedClasses
                ).join(",")}`
              ].join("\n")
            );

            if (classesProp[key] !== undefined) {
              accumulator[key] = `${renderedClasses[key]} ${classesProp[key]}`;
            }
            return accumulator;
          }, {})
        };
      } else {
        classes = renderedClasses;
      }

      const more = {};

      if (withTheme) {
        more.theme = this.theme;
      }

      return factory({
        classes,
        ref: innerRef,
        ...more,
        ...other
      });
    }
  }

  Style.propTypes = {
    classes: PropTypes.object,
    innerRef: PropTypes.func
  };

  Style.contextTypes = {
    sheetsManager: PropTypes.object,
    ...contextTypes,
    ...(listenToTheme ? themeListener.contextTypes : {})
  };

  hoistNonReactStatics(Style, BaseComponent);

  if (process.env.NODE_ENV !== "production") {
    Style.displayName = wrapDisplayName(BaseComponent, "withStyles");
  }

  return Style;
};

export default withStyles;
