import { createContext, ReactNode, useReducer } from 'react'

export type DrawerAction = {
  type: 'TOGGLE_DRAWER'
}

export type DrawerState = {
  open: boolean
  width: number
}

const INITIAL_STATE: DrawerState = {
  open: false,
  width: 250,
}

const DrawerContext = createContext({
  state: INITIAL_STATE,
  toggleDrawer: () => {},
})

const drawerReducer = (state: DrawerState, action: DrawerAction) => {
  const { type } = action

  switch (type) {
    case 'TOGGLE_DRAWER':
      return { ...state, open: !state.open }
    default:
      throw new Error(`Unhandled type ${type} in DrawerReducer`)
  }
}

const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(drawerReducer, INITIAL_STATE)

  const toggleDrawer = () => {
    dispatch({ type: 'TOGGLE_DRAWER' })
  }

  const value = { state, toggleDrawer }

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  )
}

export { DrawerProvider, DrawerContext }
