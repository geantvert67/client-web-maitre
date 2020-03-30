import React, { useState, createContext, useContext } from 'react';

const ForbiddenAreaContext = createContext();

export const ForbiddenAreaProvider = ({ children }) => {
    const [forbiddenAreas, setForbiddenAreas] = useState([]);

    return (
        <ForbiddenAreaContext.Provider
            value={{ forbiddenAreas, setForbiddenAreas }}
        >
            {children}
        </ForbiddenAreaContext.Provider>
    );
};

export const useForbiddenAreas = () => useContext(ForbiddenAreaContext);
