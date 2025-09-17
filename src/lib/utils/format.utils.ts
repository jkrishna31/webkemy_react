// import numeral, { NumeralJSLocale } from 'numeral';

import { TimeField } from "@/lib/utils/datetime.utils";

export const formatSize = (bytes: number, precision = 2) => {
    if (bytes === 0) return "0 Bytes";

    const base = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(base));
    const size = bytes / Math.pow(base, i);

    if (precision > 0) {
        const fixedSize = size.toFixed(precision);
        if (parseFloat(fixedSize) === Math.floor(size)) {
            return `${Math.floor(size)} ${sizes[i]}`;
        }
        return `${fixedSize} ${sizes[i]}`;
    }

    return `${size} ${sizes[i]}`;
};

export const formatNumber = (num: number, precision = 2) => {
    return parseFloat(num.toFixed(precision));
};

export const mask = (str: string, from: number, to: number, as: string) => {

};

export const getFormattedTime = (values: { [key in TimeField]?: number }) => {
    let formattedTime = "";
    if (values.hour) {
        formattedTime += values.hour.toString().padStart(2, "0") + ":";
    }
    formattedTime += values.minute?.toString().padStart(2, "0") + ":";
    formattedTime += values.second?.toString().padStart(2, "0");
    return formattedTime;
};
