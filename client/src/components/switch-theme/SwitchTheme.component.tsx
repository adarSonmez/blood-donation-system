import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useContext } from 'react'
import { ThemeModeContext } from '../../contexts/themeMode.context'
import { StyledDarkModeSwitch } from './SwitchTheme.styled'

function SwitchTheme() {
  const { theme, toggleThemeMode } = useContext(ThemeModeContext)

  const handleChange = () => {
    toggleThemeMode()
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={<StyledDarkModeSwitch />}
        label={theme.mode === 'light' ? 'Light Mode' : 'Night Mode'}
        onChange={handleChange}
      />
    </FormGroup>
  )
}

export default SwitchTheme
