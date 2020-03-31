import { isPointInPolygon } from 'geolib';
import { getDistance } from './geo';

export const deserializePoint = (point) => {
    return [point.longitude, point.latitude];
};

export const deserializeDragend = (e) => {
    const c = e.target.getLatLng();
    return [c.lat, c.lng];
};

export const isInForbiddenAreas = (coordinates, forbiddenAreas) => {
    let isIn = false;
    forbiddenAreas.map(
        (a) => isPointInPolygon(coordinates, a.coordinates[0]) && (isIn = true)
    );
    return isIn;
};

export const isInGameAreas = (coordinates, gameAreas) => {
    let isIn = false;
    gameAreas.map(
        (a) => isPointInPolygon(coordinates, a.coordinates[0]) && (isIn = true)
    );
    return isIn;
};

export const isFlagInConflict = (coordinates, flags, radius) => {
    let conflict = false;
    flags.map((f) => {
        getDistance(coordinates, f.coordinates) < radius * 2 &&
            (conflict = true);
    });

    return conflict;
};
