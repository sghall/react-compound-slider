import React, { Component } from 'react'
import classNames from 'classnames'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/CloseOutlined'
import GitHub from './Github'
import styles from './styles'

class Topbar extends Component {
  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar,
    } = this.props
    const rootClassName = classNames(classes.root, className)

    return (
      <div className={rootClassName}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            onClick={onToggleSidebar}
            variant="text"
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <a
            style={{ color: 'inherit' }}
            href="https://github.com/sghall/react-compound-slider"
          >
            <IconButton color="inherit">
              <GitHub />
            </IconButton>
          </a>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
        </Toolbar>
      </div>
    )
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string,
}

Topbar.defaultProps = {
  onToggleSidebar: () => {},
}

export default compose(withStyles(styles))(Topbar)
