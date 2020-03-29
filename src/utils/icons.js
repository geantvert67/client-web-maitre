import L from 'leaflet';

export const iconGameArea = new L.Icon({
    iconUrl: require('../icons/gameArea.gif'),
    iconRetinaUrl: require('../icons/gameArea.gif'),
    iconAnchor: [25, 58],
    popupAnchor: [0, 10],
    iconSize: new L.Point(60, 60),
    className: 'leaflet-div-icon',
});
