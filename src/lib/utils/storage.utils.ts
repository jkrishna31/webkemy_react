const getLocalStorage = (key: string) => {
    if (window !== undefined) {
        const value = localStorage.getItem(key);
        return value || "";
    } else {
        return "";
    }
};

const setLocalStorage = (key: string, value: any) => {
    if (window !== undefined) {
        localStorage.setItem(key, value);
    }
};

const getSessionStorage = (key: string) => { };
const setSessionStorage = (key: string, value: any) => { };

const getIndexedDB = () => { };
const setIndexedDB = () => { };

export const getLocalData = (payload: any) => {
    const { type, key } = payload;
    switch (type) {
        case "ss":
            break;
        default:
            return getLocalStorage(key);
    }
};

export const setLocalData = (payload: any) => {
    const { type, key, value } = payload;
    switch (type) {
        case "ss":
            break;
        default:
            setLocalStorage(key, value);
    }
};
