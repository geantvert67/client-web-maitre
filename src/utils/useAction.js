import React, { useState, createContext, useContext } from 'react';

const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
    const [action, setAction] = useState(null);
    const [sleepingAction, setSleepingAction] = useState(null);

    return (
        <ActionContext.Provider
            value={{ action, setAction, sleepingAction, setSleepingAction }}
        >
            {children}
        </ActionContext.Provider>
    );
};

export const useAction = () => useContext(ActionContext);
