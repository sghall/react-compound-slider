import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Example1 } from './Example1';
import { Example2 } from './Example2';
import { Example3 } from './Example3';
import { Example4 } from './Example4';

export default () => (
  <Grid spacing={2} container direction="column">
    <Grid>
      <Typography variant="h6">Prevent Crossing</Typography>
      <Typography>mode = 2 step = 5 </Typography>
      <Example1 />
    </Grid>
    <Grid>
      <Typography variant="h6">Allow Crossing</Typography>
      <Typography>mode = 1 step = 5</Typography>
      <Example2 />
    </Grid>
    <Grid>
      <Typography variant="h6">Reversed - Prevent Crossing</Typography>
      <Typography>mode = 2 step = 10</Typography>
      <Example3 />
    </Grid>
    <Grid>
      <Typography variant="h6">Reversed - Pushable Mode</Typography>
      <Typography>mode = 3 step = 10</Typography>
      <Example4 />
    </Grid>
  </Grid>
);
