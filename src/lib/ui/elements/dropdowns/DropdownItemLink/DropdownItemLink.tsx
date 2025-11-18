import Link from "next/link";

import { ArrowCircleRightIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./DropdownItemLink.module.scss";

const DropdownItemLink = ({ link, icon, text, data, className, children, ...props }: any) => {
    return (
        <Link href={link} className={classes(styles.link, className)}>
            {icon}
            {text ? <span>{text}</span> : null}
            {data ? <span>{data}</span> : null}
            <ArrowCircleRightIcon className={styles.icon} />
            {children}
        </Link>
    );
};

export default DropdownItemLink;
