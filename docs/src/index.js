import { AppContainer } from "react-hot-loader";
import { createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";
import { render } from "react-dom";
import App from "./App";

const docs = (state = { dark: false }, action) => {
  if (action.type === "TOGGLE_THEME_SHADE") {
    return Object.assign({}, state, { dark: !state.dark });
  }
  return state;
};

const store = createStore(docs);
const rootEl = document.querySelector("#app");

render(
  <AppContainer
    errorReporter={({ error }) => {
      throw error;
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootEl
);

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default; // eslint-disable-line global-require

    render(
      <AppContainer
        errorReporter={({ error }) => {
          throw error;
        }}
      >
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
