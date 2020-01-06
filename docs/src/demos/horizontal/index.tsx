import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Example1 } from './Example1';
import { Example2 } from './Example2';
import { Example3 } from './Example3';
import { Example4 } from './Example4';
import { Example5 } from './Example5';
import { Example6 } from './Example6';
import { SliderDemo } from '../SliderDemo';

export default () => (
  <Grid spacing={4} container direction="column">
    <Grid item>
      <SliderDemo
        title="Simple Value Slider"
        subtitle="mode = 1 step = 1"
        sourcePath="horizontal/Example1.tsx"
      >
        <Example1 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Prevent Crossing"
        subtitle="mode = 2 step = 5"
        sourcePath="horizontal/Example2.tsx"
      >
        <Example2 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Pushable Mode"
        subtitle="mode = 3 step = 10"
        sourcePath="horizontal/Example3.tsx"
        caption="NOTE: This demos also uses buttons for handles and enables keyboard
        events. Try using the arrow and tab keys."
      >
        <Example3 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Updating Domain/Change Direction"
        subtitle="mode = 1 step = 5"
        sourcePath="horizontal/Example4.tsx"
      >
        <Example4 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Updating Values"
        subtitle="mode = 2 step = 1"
        sourcePath="horizontal/Example5.tsx"
      >
        <Example5 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Disabled"
        subtitle="mode = 1 step = 1"
        sourcePath="horizontal/Example6.tsx"
      >
        <Example6 />
      </SliderDemo>
    </Grid>
  </Grid>
);
