import React from 'react';
import { Polygon } from 'react-leaflet';
import { GameAreaMarker } from './Markers';

function ForbiddenArea({ area }) {
    return (
        <>
            <Polygon color="red" positions={area.coordinates[0]}></Polygon>

            {area.coordinates[0].map((point, index) => (
                <GameAreaMarker key={index} position={point} />
            ))}
        </>
    );
}

export default ForbiddenArea;
