// @flow

import React from "react";
import {
  applyRouterMiddleware,
  browserHistory,
  Router,
  Route,
  IndexRoute
} from "react-router";
import { useScroll } from "react-router-scroll";
import { kebabCase, titleize } from "docs/src/utils/helpers";
import AppFrame from "docs/src/components/AppFrame";
import AppContent from "docs/src/components/AppContent";
import MarkdownDocs from "docs/src/components/MarkdownDocs";
import Home from "docs/src/pages/Home";
import {
  componentAPIs,
  requireMarkdown,
  requireDemo
} from "docs/src/components/files";

export default function AppRouter() {
  return (
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route title="Material-UI" path="/" component={AppFrame}>
        <IndexRoute dockDrawer component={Home} title={null} />
        <Route
          title="Getting Started"
          path="/getting-started"
          nav
          component={AppContent}
        >
          <Route
            title="Installation"
            path="/getting-started/installation"
            content={requireMarkdown("./getting-started/installation.md")}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Usage"
            path="/getting-started/usage"
            content={requireMarkdown("./getting-started/usage.md")}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Examples"
            path="/getting-started/examples"
            content={requireMarkdown("./getting-started/examples.md")}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Supported Components"
            path="/getting-started/supported-components"
            content={requireMarkdown(
              "./getting-started/supported-components.md"
            )}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Supported Platforms"
            path="/getting-started/supported-platforms"
            content={requireMarkdown(
              "./getting-started/supported-platforms.md"
            )}
            component={MarkdownDocs}
            nav
          />
        </Route>
        <Route
          title="Customization"
          path="/customization"
          nav
          component={AppContent}
        >
          <Route
            title="Overrides"
            path="/customization/overrides"
            content={requireMarkdown("./customization/overrides.md")}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Themes"
            path="/customization/themes"
            content={requireMarkdown("./customization/themes.md")}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="API"
            path="/customization/api"
            content={requireMarkdown("./customization/api.md")}
            component={MarkdownDocs}
            nav
          />
        </Route>
        <Route
          title="Component API"
          path="/component-api"
          nav
          component={AppContent}
        >
          {componentAPIs.map(componentAPI => {
            return (
              <Route
                key={componentAPI.name}
                title={componentAPI.name}
                path={`/component-api/${kebabCase(componentAPI.name)}`}
                content={requireMarkdown(componentAPI.path)}
                component={MarkdownDocs}
                componentAPI={componentAPI}
                nav
              />
            );
          })}
        </Route>
      </Route>
    </Router>
  );
}
