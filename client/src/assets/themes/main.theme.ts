import { createTheme } from '@mui/material'
import { pink, blue, lightBlue } from '@mui/material/colors'
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
      info: {
        main: lightBlue['500'],
        light: lightBlue['300'],
        dark: lightBlue['900'],
        contrastText: '#fff',
      },
    },

    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            whiteSpace: 'unset',
            wordBreak: 'break-all',
          },
        },
      },
    },
  })
