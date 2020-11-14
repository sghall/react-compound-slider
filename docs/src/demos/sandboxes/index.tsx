import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import { Example1 } from './Example1';
import { Example2 } from './Example2';
import { Example3 } from './Example3';

export default () => (
  <Grid spacing={2} container direction="column">
    {/* <Grid>
      <Typography variant="h6">Video Slider</Typography>
      <Example1 />
    </Grid> */}
    <Grid>
      <Typography variant="h6">Date/Time Slider</Typography>
      <Example2 />
    </Grid>
    <Grid>
      <Typography variant="h6">SVG Slider</Typography>
      <Example3 />
    </Grid>
  </Grid>
);
