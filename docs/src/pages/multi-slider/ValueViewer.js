// @flow weak

import React from 'react'
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

class ValueViewer extends React.Component {
  render() {
    const { classes, values, update } = this.props

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
        <div style={{ marginBottom: 20 }} className={classes.container}>
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
}

export default withStyles(styles)(ValueViewer)
