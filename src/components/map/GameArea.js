import React from 'react';
import { Polygon } from 'react-leaflet';
import { GameAreaMarker } from './Markers';

function GameArea({ area }) {
    return (
        <>
            <Polygon color="green" positions={area.coordinates[0]}></Polygon>

            {area.coordinates[0].map((point, index) => (
                <GameAreaMarker key={index} position={point} areaId={area.id} />
            ))}
        </>
    );
}

export default GameArea;
