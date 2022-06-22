import { createContext, useState } from 'react';

// The defaultValue argument is only used when a component does not have a matching Provider above it in the tree
export const UserContext = createContext({
  user: {
    id: '',
    name: '',
    email: '',
    type: '',
  },

  setUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    type: '',
  });

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
