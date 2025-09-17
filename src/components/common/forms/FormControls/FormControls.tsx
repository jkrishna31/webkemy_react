import { ComponentProps } from "react";

import { Button } from "@/lib/ui/elements/butttons";

import styles from "./FormControls.module.scss";

export interface FormControlsProps extends ComponentProps<"div"> {
    onCancel?: any
    disableSubmit?: boolean
    disableCancel?: boolean
    cancelLabel?: string
    submitLabel?: string
}

const FormControls = ({
    onCancel, onSubmit,
    disableSubmit, disableCancel,
    cancelLabel = "Cancel", submitLabel = "Submit",
    className,
    ...props
}: FormControlsProps) => {
    return (
        <div className={`${styles.form_controls} ${className}`}>
            <Button
                variant="secondary"
                type="reset"
                onClick={onCancel}
                disabled={disableCancel}
                className={`${styles.ctrl_btn} ${styles.sec_btn}`}
            >
                {cancelLabel}
            </Button>
            <Button
                variant="primary"
                type="submit"
                disabled={disableSubmit}
                className={`${styles.ctrl_btn}`}
            >
                {submitLabel}
            </Button>
        </div>
    );
};

export default FormControls;
