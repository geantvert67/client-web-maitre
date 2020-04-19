export const secondsToDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    return `${h <= 0 ? '00' : ('0' + h).slice(-2)}:${
        m <= 0 ? '00' : ('0' + m).slice(-2)
    }:${s <= 0 ? '00' : ('0' + s).slice(-2)}`;
};
