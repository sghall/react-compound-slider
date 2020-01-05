import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Example1 } from './Example1';
import { Example2 } from './Example2';
import { Example3 } from './Example3';
import { Example4 } from './Example4';
import { Example5 } from './Example5';
import { Example6 } from './Example6';

export default () => (
  <Grid spacing={2} container direction="column">
    <Grid>
      <Typography variant="h6">Simple Value Slider</Typography>
      <Typography>mode = 1 step = 1</Typography>
      <Example1 />
    </Grid>
    <Grid>
      <Typography variant="h6">Prevent Crossing</Typography>
      <Typography>mode = 2 step = 5</Typography>
      <Example2 />
    </Grid>
    <Grid>
      <Typography variant="h6">Pushable Mode</Typography>
      <Typography>mode = 3 step = 10</Typography>
      <Typography variant="caption">
        NOTE: This demos also uses buttons for handles and enables keyboard
        events. Try using the arrow and tab keys.
      </Typography>
      <Example3 />
    </Grid>
    <Grid>
      <Typography variant="h6">Updating Domain/Change Direction</Typography>
      <Typography>mode = 1 step = 5</Typography>
      <Example4 />
    </Grid>
    <Grid>
      <Typography variant="h6">Updating Values</Typography>
      <Typography>mode = 2 step = 1</Typography>
      <Example5 />
    </Grid>
    <Grid>
      <Typography variant="h6">Disabled</Typography>
      <Typography>mode = 1 step = 1</Typography>
      <Example6 />
    </Grid>
  </Grid>
);
