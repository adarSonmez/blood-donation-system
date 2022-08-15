import { createTheme } from '@mui/material'
import { pink, blue } from '@mui/material/colors'
import { Mode } from '../../contexts/themeMode.context'

const primaryColor = pink.A700
const secondaryColor = blue['800']

export const mainTheme = (mode: Mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        light: pink['A200'],
        dark: pink['900'],
        contrastText: '#fff',
      },
      secondary: {
        main: secondaryColor,
        light: blue['A400'],
        dark: blue['900'],
        contrastText: '#fff',
      },
    },
  })
