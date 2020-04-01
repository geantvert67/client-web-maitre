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
import { useFlags } from '../../utils/useFlags';
import { deserializeDragend } from '../../utils/map';
import { useMarkers } from '../../utils/useMarkers';
import { Button, Row, Col } from 'react-bootstrap';
import { useGameAreas } from '../../utils/useGameAreas';
import { useForbiddenAreas } from '../../utils/useForbiddenAreas';

export function GameAreaMarker({ position }) {
    const { moveGameArea } = useGameAreas();

    return (
        <Marker
            draggable
            ondragend={(e) => moveGameArea(deserializeDragend(e), position)}
            position={position}
            icon={iconGameArea}
        ></Marker>
    );
}

export function ForbiddenAreaMarker({ position, areaId }) {
    const { moveForbiddenArea } = useForbiddenAreas();

    return (
        <Marker
            draggable
            ondragend={(e) =>
                moveForbiddenArea(deserializeDragend(e), position, areaId)
            }
            position={position}
            icon={iconForbiddenArea}
        ></Marker>
    );
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
    const { moveFlag, deleteFlag } = useFlags();

    return (
        <>
            <Marker
                position={flag.coordinates}
                icon={iconFlag(color)}
                draggable
                ondragend={(e) => moveFlag(deserializeDragend(e), flag)}
            >
                <Popup>
                    <Row className="justify-content-center">
                        <Col xs="12">
                            {flag.team
                                ? `Capturé par ${flag.team.name}`
                                : 'Non capturé'}
                            {flag.capturedUntil && ` (Incapturable)`}
                        </Col>
                        <Col className="mt-2" xs="auto">
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteFlag(flag)}
                            >
                                Supprimer
                            </Button>
                        </Col>
                    </Row>
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
    const { moveMarker, deleteMarker } = useMarkers();

    return (
        <Marker
            position={marker.coordinates}
            icon={
                marker.isPositive
                    ? iconMarkerPositive(color)
                    : iconMarkerNegative(color)
            }
            draggable
            ondragend={(e) => moveMarker(deserializeDragend(e), marker)}
        >
            <Popup>
                <Row className="justify-content-center">
                    <Col xs="12">
                        Point{' '}
                        {marker.isPositive ? "d'intérêt" : 'de désintérêt'}{' '}
                        signalé par {marker.team.name}
                    </Col>
                    <Col className="mt-2" xs="auto">
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteMarker(marker)}
                        >
                            Supprimer
                        </Button>
                    </Col>
                </Row>
            </Popup>
        </Marker>
    );
}
