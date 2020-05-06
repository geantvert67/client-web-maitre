export const secondsToDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    return `${h <= 0 ? '00' : ('0' + h).slice(-2)}:${
        m <= 0 ? '00' : ('0' + m).slice(-2)
    }:${s <= 0 ? '00' : ('0' + s).slice(-2)}`;
};

export const areFlagEqual = (prevProps, nextProps) => {
    return prevProps.flag.nbUpdates === nextProps.flag.nbUpdates;
};

export const areMarkerEqual = (prevProps, nextProps) => {
    return prevProps.marker.nbUpdates === nextProps.marker.nbUpdates;
};

export const areItemEqual = (prevProps, nextProps) => {
    return prevProps.item.nbUpdates === nextProps.item.nbUpdates;
};

export const areTrapEqual = (prevProps, nextProps) => {
    return prevProps.trap.nbUpdates === nextProps.trap.nbUpdates;
};

export const areTeamEqual = (prevProps, nextProps) => {
    return prevProps.team.score === nextProps.team.score;
};

export const serializeConfig = (config) => {
    if (config.playerVisibilityRadius) {
        config.playerVisibilityRadius = parseFloat(
            config.playerVisibilityRadius
        );
    }
    if (config.playerActionRadius) {
        config.playerActionRadius = parseFloat(config.playerActionRadius);
    }
    if (config.flagVisibilityRadius) {
        config.flagVisibilityRadius = parseFloat(config.flagVisibilityRadius);
    }
    if (config.flagActionRadius) {
        config.flagActionRadius = parseFloat(config.flagActionRadius);
    }

    return config;
};

export const serializeItem = (item) => {
    item.autoMove = item.autoMove === 'true';
    item.quantity = item.quantity ? parseInt(item.quantity) : null;
    item.visibilityRadius = item.visibilityRadius
        ? parseFloat(item.visibilityRadius)
        : null;
    item.actionRadius = item.actionRadius
        ? parseFloat(item.actionRadius)
        : null;
    item.waitingPeriod = item.waitingPeriod
        ? parseInt(item.waitingPeriod)
        : null;
    item.effectDuration = item.effectDuration
        ? parseInt(item.effectDuration)
        : null;
    item.effectStrength = item.effectStrength
        ? parseInt(item.effectStrength)
        : null;

    return item;
};

export const getItemImage = (name) => {
    switch (name) {
        case 'Sentinelle':
            return require('../icons/sentinelle.png');
        case 'Canon à photons':
            return require('../icons/canonPhotons.gif');
        case 'Antenne':
            return require('../icons/antenne.png');
        case 'Sonde':
            return require('../icons/sonde.png');
        case 'Portail de transfert':
            return require('../icons/portail.png');
        case 'Disloqueur':
            return require('../icons/disloqueur.png');
        case 'Intercepteur':
            return require('../icons/intercepteur.gif');
        case 'Noyau protecteur':
            return require('../icons/noyau.png');
        case 'Oracle':
            return require('../icons/oracle.png');
        case 'Tempête':
            return require('../icons/tempete.png');
        case 'Transducteur':
            return require('../icons/transducteur.gif');
        case 'Transporteur':
            return require('../icons/transporteur.png');
        default:
            return require('../icons/cristal.png');
    }
};

export const itemsWithDuration = [
    'Sentinelle',
    'Canon à photons',
    'Intercepteur',
    'Sonde',
];

export const itemsWithEffect = ['Intercepteur', 'Sonde'];
