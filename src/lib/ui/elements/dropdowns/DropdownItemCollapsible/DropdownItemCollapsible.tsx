import { ChevronLeftIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./DropdownItemCollapsible.module.scss";

const DropdownItemCollapsible = ({ icon, text, className, ...props }: any) => {
    // use collapsible
    return (
        <button className={classes(styles.btn, className)} {...props}>
            {icon}
            {text ? <span>{text}</span> : null}
            <ChevronLeftIcon className={styles.icon} />
        </button>
    );
};

export default DropdownItemCollapsible;
