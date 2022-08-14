import { createContext, ReactNode, useReducer } from 'react'

export type ThemeModeAction = {
  type: 'TOGGLE_THEME'
}

export type Mode = 'light' | 'dark'

export type ThemeModeState = {
  mode: Mode
}

const INITIAL_THEME: ThemeModeState = {
  mode: 'light',
}

const ThemeModeContext = createContext({
  theme: INITIAL_THEME,
  toggleThemeMode: () => {},
})

const themeModeReducer: (
  state: ThemeModeState,
  action: ThemeModeAction
) => ThemeModeState = (state, action) => {
  const { type } = action

  switch (type) {
    case 'TOGGLE_THEME':
      return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' }
    default:
      throw new Error(`Unhandled type ${type} in ThemeReducer`)
  }
}

const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, dispatch] = useReducer(themeModeReducer, INITIAL_THEME)

  const toggleThemeMode = () => {
    dispatch({ type: 'TOGGLE_THEME' })
  }

  const value = { theme, toggleThemeMode }

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export { ThemeModeProvider, ThemeModeContext }
