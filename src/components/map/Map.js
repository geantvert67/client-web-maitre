import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

function Map() {
    return (
        <LeafletMap className="map" center={[47.736544, 7.286776]} zoom={17}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        </LeafletMap>
    );
}

export default Map;
