// @flow

import PropTypes from "prop-types";

export const CHANNEL = "react-electric-slide";

const themeListener = {
  contextTypes: {
    [CHANNEL]: PropTypes.object
  },

  initial: context => {
    if (!context[CHANNEL]) {
      return null;
    }

    return context[CHANNEL].getState();
  },

  subscribe: (context, cb) => {
    if (!context[CHANNEL]) {
      return null;
    }

    return context[CHANNEL].subscribe(cb);
  },

  unsubscribe(context, subscriptionId) {
    if (context[CHANNEL]) {
      context[CHANNEL].unsubscribe(subscriptionId);
    }
  }
};

export default themeListener;
