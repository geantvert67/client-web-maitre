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
