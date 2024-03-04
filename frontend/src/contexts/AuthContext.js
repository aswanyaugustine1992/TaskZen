// AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
    user: null,
    signIn: () => {},
    signOut: () => {}
  });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (username, password) => {
   setUser( username ); 
  };

  const signOut = () => {
    setUser(null);
  };
  useEffect(() => {
    console.log('User updated:', user);
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
