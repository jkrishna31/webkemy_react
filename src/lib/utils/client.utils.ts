export const hasDOM = () => {
    return typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
};

export const hasNativeShare = () => {
    return hasDOM() && navigator && navigator.share;
};

export const supportsWebAuthn = async () => {
    if (hasDOM() && window.PublicKeyCredential) {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (available) {
            return true;
        }
        return false;
    }
    return false;
};

export const copyToClipboard = (payload: ClipboardItem[] | string) => {
    if (hasDOM() && navigator && navigator.clipboard) {
        return typeof payload === "string" ? navigator.clipboard.writeText(payload) : navigator.clipboard.write(payload);
    } else {
        return Promise.reject("Failed to copy");
    }
};

export const copyToClipboardFallback = (payload: string) => {
    if (hasDOM()) {
        const textarea = document.createElement("textarea");
        textarea.value = payload;

        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.position = "fixed";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            const successful = document.execCommand("copy");
            return successful;
        } catch (error) {
            return null;
        }
    }
    return null;
};

export const readClipboard = (textOnly?: boolean) => {
    if (hasDOM() && navigator && navigator.clipboard) {
        if (textOnly) {
            return navigator.clipboard.readText();
        }
        return navigator.clipboard.read();
    }
    return null;

    // for (let item of contents) {
    //     console.log('Types for this item: ', item.types);
    //     if (item.types.includes('text/html')) {
    //         let blob = await item.getType('text/html');
    //         let html = await blob.text();
    //         console.log(html);
    //         $log.innerHTML += html.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    //         $log.innerHTML += '<hr>';
    //     }

    //     if (item.types.includes('text/plain')) {
    //         let blob = await item.getType('text/plain');
    //         let text = await blob.text();
    //         console.log(text);
    //         $log.innerHTML += text.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    //         $log.innerHTML += '<hr>';
    //     }

    //     if (item.types.includes('image/png')) {
    //         // modified from MDN sample
    //         const pngImage = new Image();
    //         pngImage.alt = "PNG image from clipboard";
    //         const blob = await item.getType("image/png");
    //         pngImage.src = URL.createObjectURL(blob);
    //         $log.appendChild(pngImage);
    //     }
    // }
};

export const paste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;
    event.preventDefault();
    for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
            const file = item.getAsFile();
            const reader = new FileReader();
            reader.onload = function (e) {
                // image.src = e.target?.result;
            };
            // reader.readAsDataURL(file);
        }
    }

    // if (!e.clipboardData.files.length) {
    //     return;
    // }
    // // Iterate over all pasted files.
    // Array.from(e.clipboardData.files).forEach(async (file) => {
    //     // Add more checks here for MIME types you're interested in,
    //     // such as `application/pdf`, `video/mp4`, etc.
    //     if (file.type.startsWith('image/')) {
    //         // For images, create an image and append it to the `body`.
    //         const img = document.createElement('img');
    //         const blob = URL.createObjectURL(file);
    //         img.src = blob;
    //         document.body.append(img);
    //     } else if (file.type.startsWith('text/')) {
    //         // For text files, read the contents and output it into a `textarea`.
    //         const textarea = document.createElement('textarea');
    //         textarea.value = await file.text();
    //         document.body.append(textarea);
    //     }
    // });
};

export const share = (data?: ShareData) => {
    if (hasNativeShare()) {
        return navigator.share(data);
    }
    return Promise.resolve(-1);
};

export const setAppBadge = (num: number) => {
    if (hasDOM() && navigator && navigator.clipboard) {
        return navigator.setAppBadge(num);
    }
    return null;
};

export const clearAppBadge = () => {
    if (hasDOM() && navigator && navigator.clipboard) {
        return navigator.clearAppBadge();
    }
    return null;
};

export const getUserAgent = () => {
    if (hasDOM()) {
        return navigator.userAgent;
    }
};

export const getPlatform = () => {
    if (!hasDOM()) return;
    if ("userAgentData" in navigator) {
        return (navigator.userAgentData as any)?.platform;
    }
    return navigator.platform;
};

export const vibrate = (pattern: number[]) => {
    if (hasDOM()) {
        navigator.vibrate?.(pattern);
    }
};

export const getBrowserDetails = () => {
    if (hasDOM()) {
        const userAgent = navigator.userAgent;
        let browserName = "Unknown";
        let browserVersion = "Unknown";

        if (/chrome|crios|crmo/i.test(userAgent)) {
            browserName = "Chrome";
            const match = userAgent.match(/(?:chrome|crios|crmo)\/([\d.]+)/i);
            browserVersion = match ? match[1] : "Unknown";
        } else if (/firefox|fxios/i.test(userAgent)) {
            browserName = "Firefox";
            const match = userAgent.match(/firefox\/([\d.]+)/i);
            browserVersion = match ? match[1] : "Unknown";
        } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
            browserName = "Safari";
            const match = userAgent.match(/version\/([\d.]+)/i);
            browserVersion = match ? match[1] : "Unknown";
        } else if (/msie|trident/i.test(userAgent)) {
            browserName = "Internet Explorer";
            const match = userAgent.match(/(?:msie |trident.*?rv:)([\d.]+)/i);
            browserVersion = match ? match[1] : "Unknown";
        } else if (/edge|edgios|edga|edg/i.test(userAgent)) {
            browserName = "Edge";
            const match = userAgent.match(/(?:edge|edgios|edga|edg)\/([\d.]+)/i);
            browserVersion = match ? match[1] : "Unknown";
        } else if (/opera|opr\//i.test(userAgent)) {
            browserName = "Opera";
            const match = userAgent.match(/(?:opera|opr\/)([\d.]+)/i);
            browserVersion = match ? match[1] : "Unknown";
        }

        return {
            name: browserName,
            version: browserVersion
        };
    } else {
        return null;
    }
};

export const getOSDetails = () => {
    if (hasDOM()) {
        const userAgent = navigator.userAgent;
        let osName = "Unknown OS";
        let osVersion = "Unknown Version";

        // Windows
        if (/windows nt 10.0/i.test(userAgent)) {
            osName = "Windows";
            osVersion = "10";
        } else if (/windows nt 6.3/i.test(userAgent)) {
            osName = "Windows";
            osVersion = "8.1";
        } else if (/windows nt 6.2/i.test(userAgent)) {
            osName = "Windows";
            osVersion = "8";
        } else if (/windows nt 6.1/i.test(userAgent)) {
            osName = "Windows";
            osVersion = "7";
        } else if (/windows nt 6.0/i.test(userAgent)) {
            osName = "Windows";
            osVersion = "Vista";
        } else if (/windows nt 5.1/i.test(userAgent)) {
            osName = "Windows";
            osVersion = "XP";
        } else if (/windows phone/i.test(userAgent)) {
            osName = "Windows Phone";
            osVersion = userAgent.match(/windows phone (?:os )?([0-9.]+)/i)?.[1] || "Unknown Version";
        }

        // macOS
        else if (/macintosh|mac os x/i.test(userAgent)) {
            osName = "Mac OS X";
            osVersion = userAgent.match(/mac os x ([0-9_]+)/i)?.[1].replace(/_/g, ".") || "Unknown Version";
        }

        // Android
        else if (/android/i.test(userAgent)) {
            osName = "Android";
            osVersion = userAgent.match(/android ([0-9.]+)/i)?.[1] || "Unknown Version";
        }

        // Linux
        else if (/linux/i.test(userAgent)) {
            osName = "Linux";
            osVersion = "Unknown Version"; // Linux distributions don’t have a single version number in the user-agent
        }

        // iOS
        else if (/iphone|ipad|ipod/i.test(userAgent)) {
            osName = "iOS";
            osVersion = userAgent.match(/os ([0-9_]+)/i)?.[1].replace(/_/g, ".") || "Unknown Version";
        }

        // Chrome OS
        else if (/cros/i.test(userAgent)) {
            osName = "Chrome OS";
            osVersion = "Unknown Version"; // Chrome OS versioning isn't available in the user-agent string
        }

        return {
            name: osName,
            version: osVersion
        };
    } else {
        return null;
    }
};

export const getCPUDetails = () => {
    if (hasDOM()) {
        const hardwareConcurrency = navigator.hardwareConcurrency;
        const cpuCores = hardwareConcurrency || "Unknown"; // `hardwareConcurrency` might be undefined in some browsers

        // Constructing a basic CPU details object
        const cpuDetails = {
            cores: cpuCores,
            // More specific details like CPU model or architecture are not available via JavaScript
        };

        return cpuDetails;
    } else {
        return null;
    }
};

export const getEngineDetails = () => {
    if (hasDOM()) {
        const userAgent = navigator.userAgent;
        let engineName = "Unknown Engine";

        if (/chrome|crios|crmo/i.test(userAgent)) {
            engineName = "Blink"; // Chrome uses Blink
        } else if (/firefox|fxios/i.test(userAgent)) {
            engineName = "Gecko"; // Firefox uses Gecko
        } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
            engineName = "WebKit"; // Safari uses WebKit
        } else if (/msie|trident/i.test(userAgent)) {
            engineName = "Trident"; // Internet Explorer uses Trident
        } else if (/edge|edgios|edga|edg/i.test(userAgent)) {
            engineName = "Blink"; // Edge (Chromium-based) uses Blink
        } else if (/opera|opr\//i.test(userAgent)) {
            engineName = "Blink"; // Opera uses Blink
        }

        return engineName;
    } else {
        return null;
    }
};

export const getDisplayMode = () => {
    if (hasDOM()) {
        if (window.matchMedia("(display-mode: fullscreen)").matches) {
            return "fullscreen";
        } else if (window.matchMedia("(display-mode: standalone)").matches) {
            return "standalone";
        } else if (window.matchMedia("(display-mode: minimal-ui)").matches) {
            return "minimal-ui";
        } else if (window.matchMedia("(display-mode: browser)").matches) {
            return "browser";
        } else {
            return "unknown"; // Default or fallback value
        }
    }
};

export const isStandalone = () => {
    if (hasDOM()) {
        const isIOSStandalone = "standalone" in window.navigator && window.navigator.standalone;
        const isOtherStandalone = window.matchMedia("(display-mode: standalone)").matches;
        if (isIOSStandalone || isOtherStandalone) {
            return true;
        } else {
            return false;
        }
    }
};

export const isSWSupported = () => {
    if (hasDOM() && "serviceWorker" in navigator && "PushManager" in window) {
        return true;
    }
    return false;
};

export const scrollTo = (payload: ScrollToOptions) => {
    if (hasDOM()) {
        window.scrollTo(payload);
    }
};

export const getQueryFromObj = (
    obj: Record<
        string,
        string | number | boolean | null | undefined | (string | number | boolean)[]
    >
) => {
    // const urlSearchParams = new URLSearchParams(obj);
    // urlSearchParams.toString();
    if (typeof obj !== "object" || obj === null) {
        throw new Error("Must be an object.");
    }
    const queryStr = Object.entries(obj)
        .filter(([key, value]) => {
            if (value === undefined || value === null || value === "") {
                return false;
            }
            if (Array.isArray(value)) {
                return value.length > 0;
            }
            return true;
        })
        .map(([key, val]) => {
            if (Array.isArray(val)) {
                return val
                    .map(val => `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`)
                    .join("&");
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`;
            }
        })
        .join("&");
    return queryStr ? queryStr : "";
};

export const isMobileDevice = () => {
    if (hasDOM() && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) return true;
    return false;
};
