import { Button } from "@/lib/ui/elements/butttons";
import { ClockIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./TimeInput.module.scss";

const TimeInput = ({ inputLabel, ...props }: any) => {
    return (
        <div className={styles.input_wrapper}>
            {/* <Button variant="secondary" type='button' className={styles.time_btn}>
                <ClockIcon className={styles.clock_icon} />
            </Button> */}
            <input type="time" className={classes(styles.input_field, styles.time_input)} {...props} />
        </div>
    );
};

export default TimeInput;
