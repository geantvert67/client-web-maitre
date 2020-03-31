import React, { useState, createContext, useContext } from 'react';

const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
    const [flags, setFlags] = useState([]);

    return (
        <FlagContext.Provider value={{ flags, setFlags }}>
            {children}
        </FlagContext.Provider>
    );
};

export const useFlags = () => useContext(FlagContext);
