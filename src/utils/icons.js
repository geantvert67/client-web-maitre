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
