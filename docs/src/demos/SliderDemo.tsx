import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { SourceLink } from './SourceLink';

interface SliderDemoProps {
  title: string;
  subtitle?: string;
  caption?: string;
  sourcePath?: string;
}

export const SliderDemo: React.FC<SliderDemoProps> = ({
  title,
  subtitle,
  caption,
  sourcePath,
  children,
}) => (
  <Paper elevation={1} style={{ padding: 16 }}>
    <Grid spacing={1} container direction="column">
      <Grid item>
        <Grid alignItems="flex-start" justify="space-between" container>
          <Grid item>
            <Typography variant="h6">{title}</Typography>
            {subtitle ? <Typography>{subtitle}</Typography> : null}
          </Grid>
          {sourcePath ? (
            <Grid item>
              <SourceLink path={sourcePath} />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      {caption ? (
        <Grid item>
          <Typography variant="caption">{caption}</Typography>
        </Grid>
      ) : null}
      <Grid item>
        <div style={{ minHeight: 120 }}>{children}</div>
      </Grid>
    </Grid>
  </Paper>
);
