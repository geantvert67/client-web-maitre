import React, { useState, createContext, useContext } from 'react';

const GameAreaContext = createContext();

export const GameAreaProvider = ({ children }) => {
    const [gameAreas, setGameAreas] = useState([]);

    return (
        <GameAreaContext.Provider value={{ gameAreas, setGameAreas }}>
            {children}
        </GameAreaContext.Provider>
    );
};

export const useGameAreas = () => useContext(GameAreaContext);
