import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { GithubIcon } from './GithubIcon';

export function TopNav() {
  return (
    <AppBar color="default">
      <Toolbar variant="dense">
        <Typography variant="h6">React Compound Slider</Typography>
        <a
          style={{ color: 'inherit' }}
          href="https://github.com/sghall/react-compound-slider"
        >
          <IconButton color="inherit">
            <GithubIcon />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  );
}
