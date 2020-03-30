import React from 'react';
import { Marker } from 'react-leaflet';
import { iconForbiddenArea, iconGameArea } from '../../utils/icons';

export function GameAreaMarker({ position }) {
    return <Marker position={position} icon={iconGameArea}></Marker>;
}

export function ForbiddenAreaMarker({ position }) {
    return <Marker position={position} icon={iconForbiddenArea}></Marker>;
}
