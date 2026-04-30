import { ComponentProps } from "react";

import { Button } from "@/lib/components/elements/buttton";
import { classes } from "@/lib/utils/style";

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
        <div className={classes(styles.form_controls, className)}>
            <Button
                variant="outlined"
                // color="red"
                type="reset"
                onClick={onCancel}
                disabled={disableCancel}
                className={classes(styles.ctrl_btn, styles.sec_btn)}
            >
                {cancelLabel}
            </Button>
            <Button
                variant="solid"
                type="submit"
                disabled={disableSubmit}
                className={classes(styles.ctrl_btn)}
            >
                {submitLabel}
            </Button>
        </div>
    );
};

export default FormControls;
