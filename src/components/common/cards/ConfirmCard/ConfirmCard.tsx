import { ReactNode } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { Modal } from "@/lib/ui/elements/modals";

import styles from "./ConfirmCard.module.scss";

export interface ConfirmCardProps {
    heading?: string
    desc?: string
    controls?: {
        id: string
        label: string
        type: "primary" | "secondary"
        onClick?: any
    }[]
    children?: ReactNode
    onCancel?: any
    overlayClass?: string,
    cardClass?: string,
    titleClass?: string,
    descClass?: string,
    controlsClass?: string,
}

const ConfirmCard = ({
    children,
    heading, desc, controls, onCancel,
    cardClass, titleClass, descClass, controlsClass,
}: ConfirmCardProps) => {
    const handleOverlayClick = () => {
        onCancel();
    };

    const renderLayout = () => {
        if (children) {
            return children;
        } else {
            return (
                <>
                    {
                        heading ? (
                            <h2 className={`${styles.title} ${titleClass}`}>{heading}</h2>
                        ) : null
                    }
                    {
                        desc ? (
                            <p className={`${styles.desc} ${descClass}`}>
                                {desc}
                            </p>
                        ) : null
                    }
                    {
                        controls ? (
                            <div className={`${styles.controls} ${controlsClass}`}>
                                {
                                    controls?.map((control: any) => {
                                        if (control.type === "primary") {
                                            return (
                                                <Button
                                                    variant="primary"
                                                    className={`${styles.control_btn}`}
                                                    key={control.id}
                                                    onClick={control.onClick}
                                                >
                                                    {control.label}
                                                </Button>
                                            );
                                        } else {
                                            return (
                                                <Button
                                                    variant="secondary"
                                                    className={`${styles.control_btn} ${styles.secondary_btn}`}
                                                    onClick={control.onClick}
                                                    key={control.id}
                                                >
                                                    {control.label}
                                                </Button>
                                            );
                                        }
                                    })
                                }
                            </div>
                        ) : null
                    }
                </>
            );
        }
    };

    return (
        <Modal overlay onClose={handleOverlayClick} className={`${styles.card} ${cardClass}`}>
            {renderLayout()}
        </Modal>
    );
};

export default ConfirmCard;
