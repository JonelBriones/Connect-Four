import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import App from './App'
import '../src/assets/fonts/SpaceGrotesk-VariableFont_wght.ttf'
const root = ReactDOM.createRoot(document.getElementById('root'))

// create your own themes
// const buttonColor = grey
const theme = createTheme({
  palette: {
    playBtn: {
      main: grey[50],
    },
  },
  typography: {
    fontFamily: ['SpaceGrotesk-Bold'],
  },
})

root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
)
