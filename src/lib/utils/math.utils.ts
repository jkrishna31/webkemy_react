export const isEqualWithPrecision = (a: number, b: number, threshold: number = Number.EPSILON) => {
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

export const clampNumber = (value: number, min: number, max: number, step?: number) => {
    let clamped = Math.min(Math.max(value, min), max);

    if (typeof step === "number" && step > 0) {
        clamped = Math.round((clamped - min) / step) * step + min;
        clamped = Math.min(Math.max(clamped, min), max);
    }

    return clamped;
};
