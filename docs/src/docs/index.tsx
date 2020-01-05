import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { SliderDocs } from './SliderDocs';
import { RailDocs } from './RailDocs';
import { HandlesDocs } from './HandlesDocs';
import { TracksDocs } from './TracksDocs';
import { TicksDocs } from './TicksDocs';

export default () => (
  <Grid spacing={2} container direction="column">
    <Grid item>
      <Typography variant="h4">Slider</Typography>
      <Typography>component props</Typography>
      <SliderDocs />
    </Grid>
    <Grid item>
      <Typography variant="h4">Rail</Typography>
      <Typography>component props</Typography>
      <RailDocs />
    </Grid>
    <Grid item>
      <Typography variant="h4">Handles</Typography>
      <Typography>component props</Typography>
      <HandlesDocs />
    </Grid>
    <Grid item>
      <Typography variant="h4">Tracks</Typography>
      <Typography>component props</Typography>
      <TracksDocs />
    </Grid>
    <Grid item>
      <Typography variant="h4">Ticks</Typography>
      <Typography>component props</Typography>
      <TicksDocs />
    </Grid>
  </Grid>
);
