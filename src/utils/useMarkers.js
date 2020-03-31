import React, { useState, createContext, useContext } from 'react';
import { useForbiddenAreas } from './useForbiddenAreas';
import { useGameAreas } from './useGameAreas';
import { isInForbiddenAreas, isInGameAreas } from './map';
import { useSocket } from './useSocket';

const MarkerContext = createContext();

export const MarkerProvider = ({ children }) => {
    const [markers, setMarkers] = useState([]);
    const { socket } = useSocket();
    const { forbiddenAreas } = useForbiddenAreas();
    const { gameAreas } = useGameAreas();

    const moveMarker = (coordinates, marker) => {
        if (
            !isInForbiddenAreas(coordinates, forbiddenAreas) &&
            isInGameAreas(coordinates, gameAreas)
        ) {
            marker.coordinates = coordinates;
            setMarkers([
                ...markers.filter((f) => f.id !== marker.id),
                ...[marker],
            ]);
            socket.emit('moveMarker', { coordinates, markerId: marker.id });
        }
    };

    const deleteMarker = (marker) => {
        setMarkers(markers.filter((m) => m.id !== marker.id));
        socket.emit('deleteMarker', marker.id);
    };

    return (
        <MarkerContext.Provider
            value={{ markers, setMarkers, moveMarker, deleteMarker }}
        >
            {children}
        </MarkerContext.Provider>
    );
};

export const useMarkers = () => useContext(MarkerContext);
