// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Link from 'react-router/lib/Link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const styles = () => ({
  root: {
    textAlign: 'center',
  },
})

function Home(props) {
  const classes = props.classes

  return (
    <Grid container alignItems="center" justify="space-around">
      <Grid item className={classes.root}>
        <Typography variant="h3" gutterBottom>
          React Compound Slider
        </Typography>
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
