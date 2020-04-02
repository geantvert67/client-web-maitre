import React, { useState, createContext, useContext } from 'react';
import _ from 'lodash';
import { useSocket } from './useSocket';

const GameAreaContext = createContext();

export const GameAreaProvider = ({ children }) => {
    const [gameAreas, setGameAreas] = useState([]);
    const { socket } = useSocket();

    const moveGameArea = (coordinates, point) => {
        const newGA = _.cloneDeep(gameAreas);
        const index = _.findIndex(
            newGA[0].coordinates[0],
            (c) => c[0] === point[0] && c[1] === point[1]
        );

        newGA[0].coordinates[0].splice(index, 1, coordinates);
        setGameAreas(newGA);
        socket.emit('moveArea', {
            coordinates: newGA[0].coordinates,
            areaId: newGA[0].id,
        });
    };

    const deleteGameAreaPoint = (point, areaId) => {
        const newGA = _.cloneDeep(gameAreas);
        const pos = _.findIndex(newGA, (a) => a.id === areaId);
        _.remove(
            newGA[pos].coordinates[0],
            (c) => c[0] === point[0] && c[1] === point[1]
        );
        setGameAreas(newGA);
        socket.emit('moveArea', {
            coordinates: newGA[pos].coordinates,
            areaId,
        });
    };

    return (
        <GameAreaContext.Provider
            value={{
                gameAreas,
                setGameAreas,
                moveGameArea,
                deleteGameAreaPoint,
            }}
        >
            {children}
        </GameAreaContext.Provider>
    );
};

export const useGameAreas = () => useContext(GameAreaContext);
