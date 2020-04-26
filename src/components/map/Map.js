import React, { useEffect, useState, useRef } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { getCenterOfBounds } from 'geolib';
import Score from './Score';
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
import { FlagMarker, MarkerMarker, ItemMarker, TrapMarker } from './Markers';
import { useFlags } from '../../utils/useFlags';
import { useMarkers } from '../../utils/useMarkers';
import { useTeams } from '../../utils/useTeams';
import PlayerList from './PlayerList';
import { useItems } from '../../utils/useItems';
import { useTraps } from '../../utils/useTraps';

function Map() {
    const { socket } = useSocket();
    const [zoom, setZoom] = useState(17);
    const [position, setPosition] = useState(null);
    const [showScore, setShowScore] = useState(false);
    const { gameAreas, setGameAreas } = useGameAreas();
    const { forbiddenAreas, setForbiddenAreas } = useForbiddenAreas();
    const { flags, setFlags, deleteFlag } = useFlags();
    const { markers, setMarkers } = useMarkers();
    const { setTeams } = useTeams();
    const { items, setItems, deleteItem } = useItems();
    const { traps, setTraps, deleteTrap } = useTraps();
    const map = useRef(null);

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
                setTraps(o.traps);
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
        checkObjects(flags, deleteFlag);
        checkObjects(items, deleteItem);
        checkObjects(traps, deleteTrap);
    }, [gameAreas, forbiddenAreas]);

    const checkObjects = (objects, deleteObject) => {
        objects.forEach((o) => {
            if (
                isInForbiddenAreas(o.coordinates, forbiddenAreas) ||
                !isInGameAreas(o.coordinates, gameAreas)
            ) {
                deleteObject(o);
            }
        });
    };

    const centerOnGameArea = () => {
        map.current.leafletElement.panTo(
            deserializePoint(getCenterOfBounds(gameAreas[0].coordinates[0]))
        );
    };

    return (
        <>
            <LeafletMap
                ref={map}
                className="map"
                center={position || [47.736544, 7.286776]}
                zoom={zoom}
                minZoom={5}
                maxZoom={25}
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

                {traps.map((trap) => (
                    <TrapMarker key={trap.id} trap={trap} />
                ))}
            </LeafletMap>

            <Score showScore={showScore} setShowScore={setShowScore} />

            <Row className="btn-toast">
                <Col xs="auto">
                    <Button onClick={centerOnGameArea} variant="light">
                        <FontAwesomeIcon icon={faVectorSquare} />
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button
                        onClick={() => setShowScore(true)}
                        variant="success"
                    >
                        Score
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default Map;
