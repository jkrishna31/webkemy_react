import Link from "next/link";

import { ArrowTopRightIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./DropdownList.module.scss";

const DropdownList = ({ options, ...props }: any) => {
    return (
        <ul className={styles.list}>
            {options.map((item: any, idx: number) => {
                if (item?.link) {
                    return (
                        <li key={idx} className={styles.list_item}>
                            <Link href={item?.link} className={styles.item}>
                                <span>{item.label}</span>
                                <ArrowTopRightIcon className={styles.arrow_icon} />
                            </Link>
                        </li>
                    );
                }
                return (
                    <li key={idx} className={styles.list_item}>
                        <button
                            className={classes(styles.item, styles.item_btn, item.danger && styles.danger)}
                            onClick={item?.onClick}
                            disabled={item?.disabled}
                        >
                            <span>{item.label}</span>
                            {
                                item.data ? <span>{item.data}</span> : null
                            }
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default DropdownList;
