// @flow weak

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = {
  slider: {
    position: 'relative',
    width: '100%',
  },
  container: {
    width: '50%',
    display: 'flex',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  item: {
    flexGrow: 1,
    border: '1px solid rgba(200,200,200,0.3)',
  },
}

const ValueViewer = ({ classes, values, update }) => {
  return (
    <div style={{ marginTop: 10, width: '100%' }}>
      <div className={classes.container}>
        <div className={classes.item}>onChange:</div>
        {values.map(d => (
          <div key={d.key} className={classes.item}>
            {d.val}
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 40 }} className={classes.container}>
        <div className={classes.item}>onUpdate:</div>
        {update.map(d => (
          <div key={d.key} className={classes.item}>
            {d.val}
          </div>
        ))}
      </div>
    </div>
  )
}

ValueViewer.propTypes = {
  values: PropTypes.array,
  update: PropTypes.array,
  classes: PropTypes.object,
}

export default withStyles(styles)(ValueViewer)
