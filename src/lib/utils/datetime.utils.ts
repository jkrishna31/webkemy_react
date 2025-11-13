export interface DateTime {
    ms: number
    second: number
    minute: number
    hour: number
    day: number
    month: number
    year: number
};

export type DateTimeField = keyof DateTime;
export type TimeField = Exclude<keyof DateTime, "year" | "month">;

const gettersUTC: Record<DateTimeField, (d: Date) => number> = {
    year: d => d.getUTCFullYear(),
    month: d => d.getUTCMonth(),
    day: d => d.getUTCDate(),
    hour: d => d.getUTCHours(),
    minute: d => d.getUTCMinutes(),
    second: d => d.getUTCSeconds(),
    ms: d => d.getUTCMilliseconds(),
};

export const getTimezoneOffset = () => {
    const date = new Date().getTimezoneOffset();
};

export const formatDate = (ts: any, locale = null, format = null) => {
    if (!ts) return;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const dt = new Date(ts);
    // it will give the locale time use utc time
    return dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear();
};

export const formatTime = (ts: string, locale: string = "en", timeFormat: "12h" | "24h" = "12h") => {
    const date = new Date(ts);
    if (timeFormat === "24h") {
        const hours24 = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const time24hr = `${hours24}:${minutes}`;
        return time24hr;
    } else {
        const hours12 = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = date.getHours() >= 12 ? "PM" : "AM";
        const time12hr = `${hours12}:${minutes} ${ampm}`;
        return time12hr;
    }
};

export const getDatesBetween = (fromDate: Date, toDate: Date,) => {
    const dates = [];
    while (fromDate < toDate) {
        dates.push(new Date(fromDate));
        fromDate.setDate(fromDate.getDate() + 1);
    }
};

export const forEachDateBetween = (fromDate: Date, toDate: Date, cb: (date: Date) => void) => {
    // fromDate.setHours(0, 0, 0, 0); // optional
    // toDate.setHours(0, 0, 0, 0); // optional
    while (fromDate < toDate) {
        cb(new Date(fromDate));
        fromDate.setDate(fromDate.getDate() + 1);
    }
};

// difference between two dates
const getDateDiff = () => {

};

// get x hrs/days/month/timestamp later/ago
const getRelativeDate = (fromDate: string, hrs: number) => {

};

export const getDaysInMonth = (year: number, monthIdx: number) => {
    return new Date(year, monthIdx + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, monthIdx: number) => {
    return new Date(year, monthIdx, 1).getDay(); // returns 0 (Sunday) to 6 (Saturday)
};

export const getWeekOfTheMonth = (year: number, month: number, day: number, weekDayStart: number) => {
    let firstWeekDayOfMonth = new Date(year, month, 1).getDay();
    firstWeekDayOfMonth = (firstWeekDayOfMonth + (weekDayStart * 6)) % 7;
    return Math.ceil((firstWeekDayOfMonth + day) / 7);
};

export const compareDateByPrecision = (ds1: string | Date, ds2: string | Date, precision?: [DateTimeField, DateTimeField]) => {
    const date1 = typeof ds1 === "string" ? new Date(ds1) : ds1;
    const date2 = typeof ds2 === "string" ? new Date(ds2) : ds2;

    const order: DateTimeField[] = ["year", "month", "day", "hour", "minute", "second", "ms"];

    const [start, end] = precision ?? ["day", "day"];
    const startIndex = order.indexOf(start);
    const endIndex = order.indexOf(end);

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
        throw new Error(`Invalid precision range: [${start}, ${end}]`);
    }

    for (let i = startIndex; i <= endIndex; i++) {
        const field: DateTimeField = order[i];
        const v1 = gettersUTC[field](date1);
        const v2 = gettersUTC[field](date2);
        if (v1 < v2) {
            return -1;
        } else if (v1 > v2) {
            return 1;
        }
    }

    return 0;
};

export const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const updateDatetime = (
    datetime: Date,
    step: number,
    field: DateTimeField,
) => {
    const newDate = new Date(datetime.getTime());

    switch (field) {
        case "ms":
            newDate.setMilliseconds(newDate.getMilliseconds() + step);
            break;
        case "second":
            newDate.setSeconds(newDate.getSeconds() + step);
            break;
        case "minute":
            newDate.setMinutes(newDate.getMinutes() + step);
            break;
        case "hour":
            newDate.setHours(newDate.getHours() + step);
            break;
        case "day":
            newDate.setDate(newDate.getDate() + step);
            break;
        case "month":
            newDate.setMonth(newDate.getMonth() + step);
            break;
        case "year":
            newDate.setFullYear(newDate.getFullYear() + step);
            break;
    }

    return newDate;

    // if (typeof datetime === "date") {
    //     const limits: Record<DateTimeField, { min: number; max: number }> = {
    //         ms: { min: 0, max: 999 },
    //         sec: { min: 0, max: 59 },
    //         min: { min: 0, max: 59 },
    //         hr: { min: 0, max: 23 },
    //         date: { min: 0, max: 31 }, // can be 28, 29, or 30 as well
    //         mon: { min: 0, max: 11 },
    //         yr: { min: 0, max: Number.MAX_SAFE_INTEGER },
    //     };

    //     const newValue = Math.max(
    //         limits[field].min,
    //         Math.min(limits[field].max, (datetime[field] ?? 0) + step)
    //     );

    //     return {
    //         ...datetime,
    //         [field]: newValue,
    //     };
    // }
};

export const getRelativeMonth = (currMonth: number, type?: "curr" | "prev" | "next" | string) => {
    if (type === "prev") {
        return currMonth - 1;
    } else if (type === "next") {
        return currMonth + 1;
    }
    return currMonth;
};

export const breakdownTime = (value: number, unit: DateTimeField = "ms", capUnit: TimeField | "day" = "day") => {
    let ms;
    switch (unit) {
        case "ms":
            ms = value;
            break;
        case "second":
            ms = value * 1000;
            break;
        case "minute":
            ms = value * 1000 * 60;
            break;
        case "hour":
            ms = value * 1000 * 60 * 60;
            break;
        case "day":
            ms = value * 1000 * 60 * 60 * 24;
            break;
        default:
            ms = 0;
    }

    const units: { [key in TimeField | "day"]: number } = {
        day: 1000 * 60 * 60 * 24,
        hour: 1000 * 60 * 60,
        minute: 1000 * 60,
        second: 1000,
        ms: 1
    };

    const order: (TimeField | "day")[] = ["day", "hour", "minute", "second", "ms"];

    const startIndex: number = order.indexOf(capUnit);

    const result = { day: 0, hour: 0, minute: 0, second: 0, ms: 0 };

    if (startIndex > 0) {
        const divisor = units[order[startIndex]];
        result[order[startIndex]] = Math.floor(ms / divisor);
        ms %= divisor;

        for (let i = startIndex + 1; i < order.length; i++) {
            const key = order[i];
            const divisor = units[key];
            result[key] = Math.floor(ms / divisor);
            ms %= divisor;
        }
    } else {
        // Normal breakdown from largest
        for (let i = 0; i < order.length; i++) {
            const key = order[i];
            const divisor = units[key];
            result[key] = Math.floor(ms / divisor);
            ms %= divisor;
        }
    }

    // const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    // ms %= 1000 * 60 * 60 * 24;

    // const hours = Math.floor(ms / (1000 * 60 * 60));
    // ms %= 1000 * 60 * 60;

    // const minutes = Math.floor(ms / (1000 * 60));
    // ms %= 1000 * 60;

    // const seconds = Math.floor(ms / 1000);
    // ms %= 1000;

    return result;
};
