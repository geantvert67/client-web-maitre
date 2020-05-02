import React from 'react';
import { useItems } from '../../utils/useItems';
import { useSocket } from '../../utils/useSocket';
import { ItemMarker } from './Markers';

function ItemList() {
    const { socket } = useSocket();
    const { items, setItems } = useItems();

    socket.on('adminRoutine', (o) => {
        if (!localStorage.getItem('moving')) setItems(o.items);
    });

    return items.map((item) => <ItemMarker key={item.id} item={item} />);
}

export default ItemList;
