import React from 'react';
import { Marker } from 'react-leaflet';
import { iconGameArea } from '../../utils/icons';

export function GameAreaMarker({ position }) {
    return <Marker position={position} icon={iconGameArea}></Marker>;
}
