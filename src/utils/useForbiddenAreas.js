import React, { useState, createContext, useContext } from 'react';
import _ from 'lodash';
import { useSocket } from './useSocket';

const ForbiddenAreaContext = createContext();

export const ForbiddenAreaProvider = ({ children }) => {
    const [forbiddenAreas, setForbiddenAreas] = useState([]);
    const { socket } = useSocket();

    const moveForbiddenArea = (coordinates, point, areaId) => {
        const newFA = _.cloneDeep(forbiddenAreas);
        const pos = _.findIndex(newFA, (a) => a.id === areaId);
        const index = _.findIndex(
            newFA[pos].coordinates[0],
            (c) => c[0] === point[0] && c[1] === point[1]
        );
        newFA[pos].coordinates[0].splice(index, 1, coordinates);
        setForbiddenAreas(newFA);
        socket.emit('moveArea', {
            coordinates: newFA[pos].coordinates,
            areaId,
        });
    };

    return (
        <ForbiddenAreaContext.Provider
            value={{ forbiddenAreas, setForbiddenAreas, moveForbiddenArea }}
        >
            {children}
        </ForbiddenAreaContext.Provider>
    );
};

export const useForbiddenAreas = () => useContext(ForbiddenAreaContext);
