import React, { useState, createContext, useContext } from 'react';

const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
    const [action, setAction] = useState('gameArea');

    return (
        <ActionContext.Provider value={{ action, setAction }}>
            {children}
        </ActionContext.Provider>
    );
};

export const useAction = () => useContext(ActionContext);
