import React, { useState, createContext, useContext } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);

    return (
        <TeamContext.Provider value={{ teams, setTeams }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeams = () => useContext(TeamContext);
