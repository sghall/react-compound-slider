import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

class Sidebar extends Component {
  render() {
    const { classes, className } = this.props

    const rootClassName = classNames(classes.root, className)

    return (
      <nav className={rootClassName}>
        <Typography variant="h6" className={classes.navTitle}>
          Introduction
        </Typography>
        <List component="div" disablePadding>
          <Link to="/getting-started/installation">
            <ListItem button>
              <ListItemText primary="Installation" />
            </ListItem>
          </Link>
          <Link to="/getting-started/features">
            <ListItem button>
              <ListItemText primary="Features" />
            </ListItem>
          </Link>
          <Link to="/getting-started/tutorial">
            <ListItem button>
              <ListItemText primary="Tutorial" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <Typography variant="h6" className={classes.navTitle}>
          Slider Demos
        </Typography>
        <List component="div" disablePadding>
          <Link to="/slider-demos/horizontal">
            <ListItem button>
              <ListItemText primary="Horizontal" />
            </ListItem>
          </Link>
          <Link to="/slider-demos/vertical">
            <ListItem button>
              <ListItemText primary="Vertical" />
            </ListItem>
          </Link>
          <Link to="/slider-demos/material-ui">
            <ListItem button>
              <ListItemText primary="Material UI" />
            </ListItem>
          </Link>
          <Link to="/slider-demos/tooltips">
            <ListItem button>
              <ListItemText primary="Tooltips" />
            </ListItem>
          </Link>
          <Link to="/slider-demos/sandboxes">
            <ListItem button>
              <ListItemText primary="CodeSandbox" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <Typography variant="h6" className={classes.navTitle}>
          Component API
        </Typography>
        <List component="div" disablePadding>
          <Link to="/component-api/slider">
            <ListItem button>
              <ListItemText primary="Slider" />
            </ListItem>
          </Link>
          <Link to="/component-api/rail">
            <ListItem button>
              <ListItemText primary="Rail" />
            </ListItem>
          </Link>
          <Link to="/component-api/tracks">
            <ListItem button>
              <ListItemText primary="Tracks" />
            </ListItem>
          </Link>
          <Link to="/component-api/ticks">
            <ListItem button>
              <ListItemText primary="Ticks" />
            </ListItem>
          </Link>
        </List>
      </nav>
    )
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Sidebar)
