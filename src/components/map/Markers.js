import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import {
    iconForbiddenArea,
    iconGameArea,
    iconPlayer,
    iconFlag,
} from '../../utils/icons';

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

export function FlagMarker({ flag }) {
    let color = flag.team ? flag.team.color : 'grey';

    return (
        <Marker position={flag.coordinates} icon={iconFlag(color)}>
            <Popup>
                {flag.team ? `Capturé par ${flag.team.name}` : 'Non capturé'}
                <br />
                {flag.capturedUntil && `Incapturable`}
            </Popup>
        </Marker>
    );
}
