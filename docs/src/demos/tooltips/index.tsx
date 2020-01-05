import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Example1 } from './Example1';
import { Example2 } from './Example2';
import { Example3 } from './Example3';
import { Example4 } from './Example4';
import { Example5 } from './Example5';

export default () => (
  <Grid spacing={2} container direction="column">
    <Grid>
      <Typography variant="h6">Tooltips on Handles Only</Typography>
      <Typography>mode = 1 step = 1</Typography>
      <Example1 />
    </Grid>
    <Grid>
      <Typography variant="h6">Tooltips on Handles and Rail</Typography>
      <Typography>mode = 1 step = 1</Typography>
      <Example2 />
    </Grid>
    <Grid>
      <Typography variant="h6">Disabling Slider with Tooltips</Typography>
      <Typography>mode = 1 step = 1</Typography>
      <Example3 />
    </Grid>
    <Grid>
      <Typography variant="h6">Tooltips with Pushable Mode</Typography>
      <Typography>mode = 3 step = 20</Typography>
      <Example4 />
    </Grid>
    <Grid>
      <Typography variant="h6">
        Tooltips on Handles and Rail / Allow crossing
      </Typography>
      <Typography>mode = 1 step = 5</Typography>
      <Example5 />
    </Grid>
  </Grid>
);
