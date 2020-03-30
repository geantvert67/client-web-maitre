import React, { useState, createContext, useContext } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);

    return (
        <PlayerContext.Provider value={{ players, setPlayers }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayers = () => useContext(PlayerContext);
