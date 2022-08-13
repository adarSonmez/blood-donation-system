import { createContext, ReactNode, useReducer } from 'react'

export type User = {
  id: string
  name: string
  email: string
  type: 'system_manager' | 'receptionist' | 'hospital' | ''
}

export type UserAction = {
  type: 'SET_CURRENT_USER' | 'CLEAR_CURRENT_USER'
  payload?: User
}

const INITIAL_USER: User = {
  id: '',
  name: '',
  email: '',
  type: '',
}

const UserContext = createContext({
  state: INITIAL_USER,
  setCurrentUser: (user: User) => {},
  clearCurrentUser: () => {},
})

const userReducer = (state: User, action: UserAction) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_CURRENT_USER':
      return { ...state, ...payload }
    case 'CLEAR_CURRENT_USER':
      return { ...INITIAL_USER }
    default:
      throw new Error(`Unhandled type ${type} in UserReducer`)
  }
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_USER)

  const setCurrentUser = (user: User) =>
    dispatch({ type: 'SET_CURRENT_USER', payload: user })

  const clearCurrentUser = () => {
    dispatch({ type: 'CLEAR_CURRENT_USER' })
    localStorage.removeItem('x-access-token')
  }

  const value = { state, setCurrentUser, clearCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserProvider, UserContext }