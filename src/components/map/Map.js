import React, { useEffect, useState } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { getCenterOfBounds } from 'geolib';
import { useSocket } from '../../utils/useSocket';
import { useGameAreas } from '../../utils/useGameAreas';
import GameArea from './GameArea';
import {
    deserializePoint,
    formatAreas,
    isInForbiddenAreas,
    isInGameAreas,
} from '../../utils/map';
import { useForbiddenAreas } from '../../utils/useForbiddenAreas';
import ForbiddenArea from './ForbiddenArea';
import { FlagMarker, MarkerMarker, ItemMarker } from './Markers';
import { useFlags } from '../../utils/useFlags';
import { useMarkers } from '../../utils/useMarkers';
import { useTeams } from '../../utils/useTeams';
import PlayerList from './PlayerList';
import { useItems } from '../../utils/useItems';

function Map() {
    const { socket } = useSocket();
    const [position, setPosition] = useState(null);
    const { gameAreas, setGameAreas } = useGameAreas();
    const { forbiddenAreas, setForbiddenAreas } = useForbiddenAreas();
    const { flags, setFlags, deleteFlag } = useFlags();
    const { markers, setMarkers } = useMarkers();
    const { setTeams } = useTeams();
    const { items, setItems } = useItems();

    useEffect(() => {
        socket.on('getAreas', (a) => {
            setGameAreas(formatAreas(a.filter((a) => !a.forbidden)));
            setForbiddenAreas(formatAreas(a.filter((a) => a.forbidden)));
        });
        socket.emit('getAreas');

        socket.on('adminRoutine', (o) => {
            if (!localStorage.getItem('moving')) {
                setMarkers(o.markers);
                setFlags(o.flags);
                setItems(o.items);
                setTeams(o.teams);
            }
        });
        const interval = setInterval(() => socket.emit('adminRoutine'), 1000);
        localStorage.removeItem('moving');

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (gameAreas.length > 0 && !position) {
            setPosition(
                deserializePoint(getCenterOfBounds(gameAreas[0].coordinates[0]))
            );
        }
    }, [gameAreas]);

    useEffect(() => {
        checkFlags();
    }, [gameAreas, forbiddenAreas]);

    const checkFlags = () => {
        flags.forEach((flag) => {
            if (
                isInForbiddenAreas(flag.coordinates, forbiddenAreas) ||
                !isInGameAreas(flag.coordinates, gameAreas)
            ) {
                deleteFlag(flag);
            }
        });
    };

    return (
        <LeafletMap
            className="map"
            center={position || [47.736544, 7.286776]}
            zoom={17}
            minZoom={5}
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

            {gameAreas.map((area) => (
                <GameArea key={area.id} area={area} />
            ))}

            {forbiddenAreas.map((area) => (
                <ForbiddenArea key={area.id} area={area} />
            ))}

            <PlayerList />

            {flags.map((flag) => (
                <FlagMarker key={flag.id} flag={flag} />
            ))}

            {markers.map((marker) => (
                <MarkerMarker key={marker.id} marker={marker} />
            ))}

            {items.map((item) => (
                <ItemMarker key={item.id} item={item} />
            ))}
        </LeafletMap>
    );
}

export default Map;
