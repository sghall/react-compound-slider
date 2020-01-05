import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  slider: {
    position: 'relative' as 'relative',
    width: '100%',
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      width: '75%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    display: 'flex',
    textAlign: 'center' as 'center',
    fontFamily: 'monospace',
  },
  item: {
    flexGrow: 1,
    border: '1px solid rgba(200,200,200,0.3)',
  },
});

interface ValueViewerProps {
  format?: (val: number) => string;
  values: number[];
  update: number[];
  classes: { [key: string]: string };
}

const ValueViewer: React.FC<ValueViewerProps> = ({
  classes,
  values,
  update,
  format = d => d,
}) => {
  return (
    <div style={{ marginTop: 10, width: '100%' }}>
      <div className={classes.container}>
        <div className={classes.item}>onChange:</div>
        {values.map((d, i) => (
          <div key={i} className={classes.item}>
            {format(d)}
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 40 }} className={classes.container}>
        <div className={classes.item}>onUpdate:</div>
        {update.map((d, i) => (
          <div key={i} className={classes.item}>
            {format(d)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withStyles(styles)(ValueViewer);
