import { createContext, useReducer } from 'react';

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER: 'CLEAR_CURRENT_USER',
};

const INITIAL_USER = {
  id: '',
  name: '',
  email: '',
  type: '',
};

const UserContext = createContext({
  user: INITIAL_USER,
  setCurrentUser: () => null,
  clearCurrentUser: () => null,
});

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, user: payload };
    case USER_ACTION_TYPES.CLEAR_CURRENT_USER:
      return { ...state, user: INITIAL_USER };
    default:
      throw new Error(`Unhandled type ${type} in UserReducer`);
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: INITIAL_USER });

  const { user } = state;

  const setCurrentUser = (user) =>
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });

  const clearCurrentUser = () => {
    dispatch({ type: USER_ACTION_TYPES.CLEAR_CURRENT_USER });
    localStorage.removeItem('x-access-token');
  };

  const value = { user, setCurrentUser, clearCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
