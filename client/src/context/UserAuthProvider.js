// UserAuthProvider.js
import React, { createContext, useContext, useState } from 'react';

const UserAuthContext = createContext();

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};

const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [signUp, setSignUp] = useState(false);

  
  const handleAuthSubmit = async (values, actions, authType) => {
    try {
      // Determine the endpoint based on authType
      const endpoint = authType === 'signup' ? '/signup' : '/login';
  
      const response = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          setError('Bad credentials'); 
        } else {
          setError(errorData.message);
        }
        actions.resetForm(); 
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  const checkAuthorized = async () => {
    const response = await fetch('/authorized')
    if (response.ok) {
      const user = await response.json();
      setUser(user);
    }else {
       setError('Bad credentials');
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/logout', {
        method: 'DELETE',
      });

      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleClick = () => {
    setSignUp(!signUp);
    setError(null);
  };

  const contextValue = {
    user,
    setUser,
    error,
    signUp,
    handleAuthSubmit,
    handleLogout,
    handleClick,
    checkAuthorized
  };

  return (
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
