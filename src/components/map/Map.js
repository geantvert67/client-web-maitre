import React, { useEffect, useState } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { getCenterOfBounds } from 'geolib';
import { useSocket } from '../../utils/useSocket';
import { useGameAreas } from '../../utils/useGameAreas';
import GameArea from './GameArea';
import { deserializePoint } from '../../utils/map';
import { useForbiddenAreas } from '../../utils/useForbiddenAreas';
import ForbiddenArea from './ForbiddenArea';

function Map() {
    const { socket } = useSocket();
    const [position, setPosition] = useState([47.736544, 7.286776]);
    const { gameAreas, setGameAreas } = useGameAreas();
    const { forbiddenAreas, setForbiddenAreas } = useForbiddenAreas();

    useEffect(() => {
        socket.on('getAreas', (a) => {
            setGameAreas(a.filter((a) => !a.forbidden));
            setForbiddenAreas(a.filter((a) => a.forbidden));
        });
        socket.emit('getAreas');
    }, []);

    useEffect(() => {
        if (gameAreas.length > 0) {
            setPosition(
                deserializePoint(getCenterOfBounds(gameAreas[0].coordinates[0]))
            );
        }
    }, [gameAreas]);

    return (
        <LeafletMap className="map" center={position} zoom={17}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

            {gameAreas.map((area) => (
                <GameArea key={area.id} area={area} />
            ))}

            {forbiddenAreas.map((area) => (
                <ForbiddenArea key={area.id} area={area} />
            ))}
        </LeafletMap>
    );
}

export default Map;
