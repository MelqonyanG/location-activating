import L from 'leaflet';

const activeIcon = new L.Icon({
    iconUrl: require('../img/activeMarker.png'),
    iconSize: new L.Point(50, 50),
});

const deactiveIcon = new L.Icon({
    iconUrl: require('../img/deactiveMarker.png'),
    iconSize: new L.Point(50, 50),
});

export { activeIcon, deactiveIcon };
