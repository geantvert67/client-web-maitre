import React from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import {
    iconForbiddenArea,
    iconGameArea,
    iconPlayer,
    iconFlag,
    iconMarkerNegative,
    iconMarkerPositive,
} from '../../utils/icons';
import { useConfig } from '../../utils/useConfig';

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
    const color = flag.team ? flag.team.color : 'grey';
    const { config } = useConfig();

    return (
        <>
            <Marker position={flag.coordinates} icon={iconFlag(color)}>
                <Popup>
                    {flag.team
                        ? `Capturé par ${flag.team.name}`
                        : 'Non capturé'}
                    <br />
                    {flag.capturedUntil && `Incapturable`}
                </Popup>
            </Marker>

            <Circle
                center={flag.coordinates}
                radius={config.flagVisibilityRadius}
            />
        </>
    );
}

export function MarkerMarker({ marker }) {
    const color = marker.team.color;

    return (
        <Marker
            position={marker.coordinates}
            icon={
                marker.isPositive
                    ? iconMarkerPositive(color)
                    : iconMarkerNegative(color)
            }
        >
            <Popup>
                Point {marker.isPositive ? "d'intérêt" : 'de désintérêt'}{' '}
                signalé par {marker.team.name}
            </Popup>
        </Marker>
    );
}
