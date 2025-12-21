import { classes } from "@/lib/utils/style.utils";

import styles from "./DateInput.module.scss";

const DateInput = ({ ...props }: any) => {
    return (
        <div className={styles.input_wrapper}>
            <input type="date" className={classes(styles.input_field, styles.date_input)} {...props} />
        </div>
    );
};

export default DateInput;
