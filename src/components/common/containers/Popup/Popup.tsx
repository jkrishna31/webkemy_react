"use client";

import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";

import styles from "./Popup.module.scss";

const Popup = ({ closeAfterInterval, children, className, ...props }: PropsWithChildren<any>) => {
    const [showPopup, setShowPopup] = useState<boolean>(true);

    const closePopup = useCallback(() => {
        setShowPopup(false);
    }, []);

    useEffect(() => {
        if (closeAfterInterval) {
            setTimeout(() => {
                closePopup();
            }, closeAfterInterval);
        }
    }, [closeAfterInterval, closePopup]);

    if (showPopup) {
        return (
            <div className={`${styles.popup} ${className}`} {...props}>
                {children}
            </div>
        );
    }
    else {
        return null;
    }
};

export default Popup;
