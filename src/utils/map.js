import { isPointInPolygon } from 'geolib';
import _ from 'lodash';
import { getDistance } from './geo';

export const deserializePoint = (point) => {
    return [point.longitude, point.latitude];
};

export const deserializeDragend = (e) => {
    const c = e.target.getLatLng();
    return [c.lat, c.lng];
};

export const deserializeClick = (e) => {
    return [e.latlng.lat, e.latlng.lng];
};

export const formatAreas = (areas) => {
    return areas.map((a) => ({
        ...a,
        ...{ coordinates: [_.uniqBy(a.coordinates[0], (c) => c[0] && c[1])] },
    }));
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
    flags.forEach((f) => {
        getDistance(coordinates, f.coordinates) < radius * 2 &&
            (conflict = true);
    });

    return conflict;
};
