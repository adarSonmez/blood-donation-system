import { createTheme } from '@mui/material'
import { pink, purple, red } from '@mui/material/colors'
import { Mode } from '../../contexts/themeMode.context'

export const mainTheme = (mode: Mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: pink['A700'],
        light: pink['A200'],
        dark: pink['900'],
        contrastText: '#fff',
      },
      secondary: {
        main: purple['A400'],
        light: purple['A200'],
        dark: purple['A700'],
        contrastText: '#fff',
      },
    },
  })
