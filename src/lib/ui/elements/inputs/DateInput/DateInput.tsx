import { Button } from "@/lib/ui/elements/butttons";
import { CalendarIcon } from "@/lib/ui/svgs/icons";

import styles from "./DateInput.module.scss";

const DateInput = ({ ...props }: any) => {
    return (
        <div className={styles.input_wrapper}>
            {/* <Button variant="secondary" type='button' className={styles.date_btn}>
                <CalendarIcon className={styles.calendar_icon} />
            </Button> */}
            <input type="date" className={`${styles.input_field} ${styles.date_input}`} {...props} />
        </div>
    );
};

export default DateInput;
