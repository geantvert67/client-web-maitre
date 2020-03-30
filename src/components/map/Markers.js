import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { iconForbiddenArea, iconGameArea, iconPlayer } from '../../utils/icons';

export function GameAreaMarker({ position }) {
    return <Marker position={position} icon={iconGameArea}></Marker>;
}

export function ForbiddenAreaMarker({ position }) {
    return <Marker position={position} icon={iconForbiddenArea}></Marker>;
}

export function PlayerMarker({ player }) {
    const color = player.isConnected ? player.teamColor : 'grey';

    return (
        <Marker position={player.coordinates} icon={iconPlayer(color)}>
            <Popup>
                {player.username} {!player.isConnected && '(Déconnecté)'}
            </Popup>
        </Marker>
    );
}
