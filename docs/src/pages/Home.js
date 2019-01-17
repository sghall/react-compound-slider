// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Link from 'react-router/lib/Link'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import logo from './slider_white.png'

const styles = () => ({
  root: {
    marginTop: 100,
    textAlign: 'center',
  },
})

function Home(props) {
  const classes = props.classes

  return (
    <Grid container alignItems="center" justify="space-around">
      <Grid item className={classes.root}>
        <img src={logo} />
      </Grid>
      <Grid item xs={12} className={classes.root}>
        <Button
          component={Link}
          variant="outlined"
          to="/getting-started/tutorial"
        >
          Get Started
        </Button>
      </Grid>
    </Grid>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
