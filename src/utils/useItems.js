import React, { useState, createContext, useContext } from 'react';
import { useSocket } from './useSocket';
import { useForbiddenAreas } from './useForbiddenAreas';
import { useGameAreas } from './useGameAreas';
import { isInForbiddenAreas, isInGameAreas } from './map';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const { socket } = useSocket();
    const { forbiddenAreas } = useForbiddenAreas();
    const { gameAreas } = useGameAreas();

    const moveItem = (coordinates, item) => {
        if (
            !isInForbiddenAreas(coordinates, forbiddenAreas) &&
            isInGameAreas(coordinates, gameAreas)
        ) {
            item.coordinates = coordinates;
            setItems([...items.filter((i) => i.id !== item.id), ...[item]]);
        }

        socket.emit('moveItem', {
            coordinates: item.coordinates,
            itemId: item.id,
        });
    };

    const deleteItem = (item) => {
        setItems(items.filter((i) => i.id !== item.id));
        socket.emit('deleteItem', item.id);
    };

    return (
        <ItemContext.Provider value={{ items, setItems, moveItem, deleteItem }}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItems = () => useContext(ItemContext);
