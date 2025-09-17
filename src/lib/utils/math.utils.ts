export const isEqual = (a: number, b: number, threshold: number = Number.EPSILON) => {
    return Math.abs(a - b) < threshold;
};

export const randomBetween = (min: number, max: number) => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
};

export const degToRad = (deg: number) => {
    return deg * (Math.PI / 180);
};

export const radToDeg = (rad: number) => {
    return rad / (Math.PI / 180);
};

export const clampNumber = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};
