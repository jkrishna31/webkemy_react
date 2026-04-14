export const getLocalStorage = (key: string) => {
    if (window !== undefined) {
        const value = localStorage.getItem(key);
        return value || "";
    } else {
        return "";
    }
};

export const setLocalStorage = (key: string, value: any) => {
    if (window !== undefined) {
        localStorage.setItem(key, value);
    }
};

export const getSessionStorage = (key: string) => { };
export const setSessionStorage = (key: string, value: any) => { };

export const getIndexedDB = () => { };
export const setIndexedDB = () => { };
