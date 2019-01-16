// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import deepOrange from '@material-ui/core/colors/deepOrange'
import { lightTheme, darkTheme, setPrismTheme } from '../utils/prism'
import AppRouter from './AppRouter'

function AppContainer(props) {
  const { dark } = props

  const theme = createMuiTheme({
    palette: {
      primary: blue,
      accent: deepOrange,
      type: dark ? 'dark' : 'light',
    },
  })

  if (dark) {
    setPrismTheme(darkTheme)
  } else {
    setPrismTheme(lightTheme)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  )
}

AppContainer.propTypes = {
  dark: PropTypes.bool.isRequired,
}

const ConnectedApp = connect(state => ({ dark: state.dark }))(AppContainer)

function App() {
  return <ConnectedApp />
}

export default App
