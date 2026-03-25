import { classes } from "@/lib/utils/style";

import styles from "./TimeInput.module.scss";

const TimeInput = ({ inputLabel, ...props }: any) => {
    return (
        <div className={styles.input_wrapper}>
            <input type="time" className={classes(styles.input_field, styles.time_input)} {...props} />
        </div>
    );
};

export default TimeInput;
