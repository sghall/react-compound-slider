import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import { TopNav } from './TopNav';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';

const options = {
  fallback: (
    <Grid container justify="center" alignContent="center" direction="column">
      <Grid item>
        <CircularProgress thickness={1.5} size={75} />
      </Grid>
    </Grid>
  ),
};

const Horizontal = loadable(() => import('./demos/horizontal'), options);
const Vertical = loadable(() => import('./demos/vertical'), options);
const MaterialUi = loadable(() => import('./demos/material-ui'), options);
const Tooltips = loadable(() => import('./demos/tooltips'), options);
const Sandboxes = loadable(() => import('./demos/sandboxes'), options);
const Documentation = loadable(() => import('./docs'), options);
const Home = loadable(() => import('./Home'), options);

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <TopNav />
        <div style={{ height: 50, width: '100%' }} />
        <div style={{ padding: 10, overflowX: 'hidden' as 'hidden' }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container>
                <Grid>
                  <Link to="/">
                    <Button>Home</Button>
                  </Link>
                </Grid>
                <Grid>
                  <Link to="/docs">
                    <Button>Docs</Button>
                  </Link>
                </Grid>
                <Grid>
                  <Link to="/horizontal">
                    <Button>Horizontal</Button>
                  </Link>
                </Grid>
                <Grid>
                  <Link to="/vertical">
                    <Button>Vertical</Button>
                  </Link>
                </Grid>
                <Grid>
                  <Link to="/material-ui">
                    <Button>Material UI</Button>
                  </Link>
                </Grid>
                <Grid>
                  <Link to="/tooltips">
                    <Button>Tooltips</Button>
                  </Link>
                </Grid>
                <Grid>
                  <Link to="/sandboxes">
                    <Button>Sandboxes</Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                <b>Note:</b> react-compound-slider is not concerned with the
                markup or style of rendered content. The user defines the rail,
                handle, track and tick components. The demos on this site are
                provided to help people get started and are used to test changes
                to the library. While they generally work on mobile, the demos
                are not really optimized for mobile devices.
              </Typography>
            </Grid>
            <Grid item>
              <div style={{ padding: '30px 0px' }}>
                <Grid justify="center" container>
                  <Grid item xs={12} md={8}>
                    <Switch>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route exact path="/docs">
                        <Documentation />
                      </Route>
                      <Route exact path="/horizontal">
                        <Horizontal />
                      </Route>
                      <Route exact path="/vertical">
                        <Vertical />
                      </Route>
                      <Route exact path="/material-ui">
                        <MaterialUi />
                      </Route>
                      <Route exact path="/tooltips">
                        <Tooltips />
                      </Route>
                      <Route exact path="/sandboxes">
                        <Sandboxes />
                      </Route>
                      <Redirect to="/" />
                    </Switch>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
