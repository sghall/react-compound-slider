import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import styles from './styles'

class DashboardLayout extends Component {
  constructor(props) {
    super(props)

    const isMobile = ['xs', 'sm', 'md'].includes(props.width)

    this.state = {
      isOpen: !isMobile,
      snackbarOpen: true,
    }
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  closeSnackBar = () => {
    this.setState({ snackbarOpen: false })
  }

  handleToggleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render() {
    const { classes, width, children } = this.props
    const { isOpen } = this.state

    const isMobile = ['xs', 'sm', 'md'].includes(width)
    const shiftTopbar = isOpen && !isMobile
    const shiftContent = isOpen && !isMobile

    return (
      <Fragment>
        <Topbar
          className={classNames(classes.topbar, {
            [classes.topbarShift]: shiftTopbar,
          })}
          isSidebarOpen={isOpen}
          onToggleSidebar={this.handleToggleOpen}
          title="React Compound Slider"
        />
        <Drawer
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
          onClose={this.handleClose}
          open={isOpen}
          variant={isMobile ? 'temporary' : 'persistent'}
        >
          <Sidebar className={classes.sidebar} />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: shiftContent,
          })}
        >
          {children}
          <Snackbar
            open={this.state.snackbarOpen}
            autoHideDuration={30000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'snackbar-fab-message-id',
              className: classes.snackbarContent,
            }}
            message={
              <span id="snackbar-fab-message-id">
                <b>Note:</b> react-compound-slider does not create the slider
                content. The user defines the rail, handle, track and tick
                content. The demos on this site are provided to help people get
                started and are used to test changes to the library. While they
                generally work on mobile, the demos are NOT optimized for mobile
                devices.
              </span>
            }
            action={
              <Button color="inherit" size="small" onClick={this.closeSnackBar}>
                Close
              </Button>
            }
            className={classes.snackbar}
          />
        </main>
      </Fragment>
    )
  }
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
}

export default compose(
  withStyles(styles),
  withWidth(),
)(DashboardLayout)
