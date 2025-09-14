// src/context/StoreContext.js
import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [storeDomain, setStoreDomain] = useState('');
  return (
    <StoreContext.Provider value={{ storeDomain, setStoreDomain }}>
      {children}
    </StoreContext.Provider>
  );
};
