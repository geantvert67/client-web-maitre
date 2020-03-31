import React, { useEffect, useState } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { getCenterOfBounds } from 'geolib';
import { useSocket } from '../../utils/useSocket';
import { useGameAreas } from '../../utils/useGameAreas';
import GameArea from './GameArea';
import { deserializePoint } from '../../utils/map';
import { useForbiddenAreas } from '../../utils/useForbiddenAreas';
import ForbiddenArea from './ForbiddenArea';
import { usePlayers } from '../../utils/usePlayers';
import { PlayerMarker, FlagMarker } from './Markers';
import { useFlags } from '../../utils/useFlags';

function Map() {
    const { socket } = useSocket();
    const [position, setPosition] = useState([47.736544, 7.286776]);
    const { gameAreas, setGameAreas } = useGameAreas();
    const { forbiddenAreas, setForbiddenAreas } = useForbiddenAreas();
    const { players, setPlayers } = usePlayers();
    const { flags, setFlags } = useFlags();

    useEffect(() => {
        socket.on('getAreas', (a) => {
            setGameAreas(a.filter((a) => !a.forbidden));
            setForbiddenAreas(a.filter((a) => a.forbidden));
        });
        socket.emit('getAreas');

        socket.on('adminRoutine', (o) => {
            setPlayers(o.players);
            setFlags(o.flags);
        });
        const interval = setInterval(() => socket.emit('adminRoutine'), 3000);

        return () => clearInterval(interval);
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

            {players
                .filter((p) => p.coordinates.length > 0)
                .map((player) => (
                    <PlayerMarker key={player.username} player={player} />
                ))}

            {flags.map((flag) => (
                <FlagMarker key={flag.id} flag={flag} />
            ))}
        </LeafletMap>
    );
}

export default Map;
