import React, { useState, createContext, useContext } from 'react';
import { useSocket } from './useSocket';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const { socket } = useSocket();
    const [items, setItems] = useState([]);

    const deleteItem = (item) => {
        setItems(items.filter((i) => i.id !== item.id));
        socket.emit('deleteItem', item.id);
    };

    return (
        <ItemContext.Provider value={{ items, setItems, deleteItem }}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItems = () => useContext(ItemContext);
