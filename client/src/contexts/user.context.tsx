import { createContext, ReactNode, useReducer } from 'react'
import { SystemUser } from '../api/users.api'

export type UserAction = {
  type: 'SET_CURRENT_USER' | 'CLEAR_CURRENT_USER'
  payload?: SystemUser
}

const INITIAL_USER: SystemUser = {
  user_id: '',
  full_name: '',
  e_mail: '',
  phone: '',
  address: '',
  user_type: '',
  password: '',
}

const UserContext = createContext({
  user: INITIAL_USER,
  setCurrentUser: (user: SystemUser) => {},
  clearCurrentUser: () => {},
})

const userReducer = (state: SystemUser, action: UserAction) => {
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
  const [user, dispatch] = useReducer(userReducer, INITIAL_USER)

  const setCurrentUser = (user: SystemUser) =>
    dispatch({ type: 'SET_CURRENT_USER', payload: user })

  const clearCurrentUser = () => {
    dispatch({ type: 'CLEAR_CURRENT_USER' })
    localStorage.removeItem('x-access-token')
  }

  const value = { user, setCurrentUser, clearCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserProvider, UserContext }
