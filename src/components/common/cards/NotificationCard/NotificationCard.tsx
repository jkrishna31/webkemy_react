"use client";

import { useState } from "react";

import { Popup } from "@/components/common/containers";
import { classes } from "@/lib/utils/style.utils";

import styles from "./NotificationCard.module.scss";

const NotificationCard = ({ message, closeAfterInterval = 5000, ...props }: any) => {
    return (
        <Popup closeAfterInterval={closeAfterInterval} className={styles.popup}>
            <NotificationCardComp message={message} />
        </Popup>
    );
};

const NotificationCardComp = ({ message, closePopup, ...props }: any) => {
    const [controls, setControls] = useState<boolean>(false);

    const closeNotification = () => {
        closePopup();
    };

    return (
        <div className={styles.card_wrapper} onMouseEnter={() => setControls(true)} onMouseLeave={() => setControls(false)} role="alert">
            <div className={classes(styles.message_wrapper, styles.wrapper)}>
                <p>{message}</p>
                {/* <DownChevronIcon className={styles.down_icon} /> */}
            </div>
            {
                controls && (
                    <div className={styles.controls_container}>
                        <div className={classes(styles.controls_wrapper, styles.wrapper)}>
                            <button type="button" className={classes(styles.card_btn, styles.card_read_btn)}>
                                {"Mark as Read"}
                            </button>
                            <div className={styles.card_btn_separator}></div>
                            <button
                                type="button" className={classes(styles.card_btn, styles.card_close_btn)}
                                onClick={closeNotification}
                            >
                                {"Close"}
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default NotificationCard;
