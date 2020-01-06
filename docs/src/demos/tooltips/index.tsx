import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Example1 } from './Example1';
import { Example2 } from './Example2';
import { Example3 } from './Example3';
import { Example4 } from './Example4';
import { Example5 } from './Example5';
import { SliderDemo } from '../SliderDemo';

export default () => (
  <Grid spacing={4} container direction="column">
    <Grid item>
      <SliderDemo
        title="Tooltips on Handles Only"
        subtitle="mode = 1 step = 1"
        sourcePath="tooltips/Example1.tsx"
      >
        <Example1 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Tooltips on Handles and Rail"
        subtitle="mode = 1 step = 1"
        sourcePath="tooltips/Example2.tsx"
      >
        <Example2 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Disabling Slider with Tooltips"
        subtitle="mode = 1 step = 1"
        sourcePath="tooltips/Example3.tsx"
      >
        <Example3 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Tooltips with Pushable Mode"
        subtitle="mode = 3 step = 20"
        sourcePath="tooltips/Example4.tsx"
      >
        <Example4 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Tooltips with Allow crossing"
        subtitle="mode = 1 step = 5"
        sourcePath="tooltips/Example5.tsx"
      >
        <Example5 />
      </SliderDemo>
    </Grid>
  </Grid>
);
