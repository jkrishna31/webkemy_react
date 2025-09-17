import Link from "next/link";

import styles from "./RenderInline.module.scss";

const RenderInline = ({ payload, ...props }: any) => {
    const inlines = payload.inlines;
    let formatted = payload.text;
    if (!inlines) return formatted;
    if (inlines[0]) {
        formatted = <strong className={styles.ib}>{formatted}</strong>; // use strong
    }
    if (inlines[1]) {
        formatted = <em className={styles.ii}>{formatted}</em>;
    }
    if (inlines[2]) {
        formatted = <u className={styles.iu}>{formatted}</u>;
    }
    if (inlines[3]) {
        formatted = <s className={styles.is}>{formatted}</s>;
    }
    if (inlines[4]) {
        formatted = <Link href={payload.link} className={styles.ia}>{formatted}</Link>;
    }
    if (inlines[5]) {
        formatted = <code className={styles.ic}>{formatted}</code>;
    }
    if (inlines[6]) {
        formatted = <mark className={styles.ih}>{formatted}</mark>;
    }
    if (inlines[7]) {
        formatted = <sub className={styles.isb}>{formatted}</sub>;
    }
    if (inlines[8]) {
        formatted = <sup className={styles.isp}>{formatted}</sup>;
    }
    return formatted;
};

export default RenderInline;
