import L from 'leaflet';

export const iconGameArea = new L.Icon({
    iconUrl: require('../icons/gameArea.gif'),
    iconRetinaUrl: require('../icons/gameArea.gif'),
    iconAnchor: [25, 58],
    popupAnchor: [0, 10],
    iconSize: new L.Point(60, 60),
    className: 'leaflet-div-icon',
});

export const iconForbiddenArea = new L.Icon({
    iconUrl: require('../icons/gameArea.gif'),
    iconRetinaUrl: require('../icons/gameArea.gif'),
    iconAnchor: [25, 58],
    popupAnchor: [0, 10],
    iconSize: new L.Point(60, 60),
    className: 'leaflet-div-icon',
});

export const iconPlayer = (color) =>
    new L.divIcon({
        className: 'leaflet-div-icon',
        iconSize: new L.Point(30, 30),
        html: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path fill=${color} d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path></svg>`,
    });

export const iconFlag = (color) =>
    new L.divIcon({
        className: 'leaflet-div-icon',
        iconSize: new L.Point(60, 60),
        html: `<svg role="img" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill=${color} stroke="none"><path d="M245 560 c-4 -7 -32 -74 -61 -148 l-53 -136 71 -123 c39 -68 72 -123 74 -123 1 0 32 56 68 124 l66 123 -30 98 c-26 88 -35 104 -78 148 -35 35 -52 46 -57 37z m31 -52 c9 -29 18 -55 20 -57 2 -2 14 4 26 15 l23 19 -22 -25 c-18 -21 -73 -201 -73 -239 0 -6 32 5 71 25 39 19 73 34 75 31 2 -2 -28 -19 -67 -38 l-71 -34 6 -50 c3 -28 8 -67 11 -86 5 -32 5 -33 -4 -5 -6 15 -13 52 -16 80 -6 43 -12 56 -33 69 -15 9 -40 28 -57 42 -18 17 -10 13 21 -9 l50 -35 27 112 28 112 -21 59 c-22 64 -22 66 -16 66 3 0 12 -24 22 -52z"/></g></svg>`,
    });
