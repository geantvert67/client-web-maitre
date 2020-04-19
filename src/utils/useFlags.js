import React, { useState, createContext, useContext } from 'react';
import { useSocket } from './useSocket';
import { useForbiddenAreas } from './useForbiddenAreas';
import { isInForbiddenAreas, isFlagInConflict, isInGameAreas } from './map';
import { useConfig } from './useConfig';
import { useGameAreas } from './useGameAreas';

const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
    const [flags, setFlags] = useState([]);
    const { socket } = useSocket();
    const { config } = useConfig();
    const { forbiddenAreas } = useForbiddenAreas();
    const { gameAreas } = useGameAreas();

    const moveFlag = (coordinates, flag) => {
        if (
            !isInForbiddenAreas(coordinates, forbiddenAreas) &&
            !isFlagInConflict(
                coordinates,
                flags.filter((f) => f.id !== flag.id),
                config.flagVisibilityRadius
            ) &&
            isInGameAreas(coordinates, gameAreas)
        ) {
            flag.coordinates = coordinates;
            setFlags([...flags.filter((f) => f.id !== flag.id), ...[flag]]);
            socket.emit('moveFlag', { coordinates, flagId: flag.id });
        }
    };

    const deleteFlag = (flag) => {
        setFlags(flags.filter((f) => f.id !== flag.id));
        socket.emit('deleteFlag', flag.id);
    };

    const captureFlag = (flagId, teamId) => {
        socket.emit('captureFlag', { flagId, teamId: parseInt(teamId) });
    };

    const resetFlag = (flagId) => {
        socket.emit('resetFlag', flagId);
    };

    return (
        <FlagContext.Provider
            value={{
                flags,
                setFlags,
                moveFlag,
                deleteFlag,
                captureFlag,
                resetFlag,
            }}
        >
            {children}
        </FlagContext.Provider>
    );
};

export const useFlags = () => useContext(FlagContext);
