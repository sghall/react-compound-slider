// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import PropsDescription from 'docs/src/components/PropsDescription'

const styles = {
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}

function ComponentDoc({ classes, route: { content } }) {
  return (
    <div className={classes.root}>
      <PropsDescription key={content} code={content} />
    </div>
  )
}

ComponentDoc.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.shape({
    content: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
}

export default withStyles(styles)(ComponentDoc)
