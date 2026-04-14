import { Fragment } from "react/jsx-runtime";

import { PageSetup } from "@/components/managers";
import { Checkbox } from "@/lib/components/elements/inputs/Checkbox";
import SortIcon from "@/lib/svgs/icons/SortIcon";
import { classes } from "@/lib/utils/style";

import styles from "./page.module.scss";

const Page = () => {
  // req:
  // - col resize
  // - col dnd
  // - row dnd
  // - row resize

  return (
    <main className={styles.main}>
      <PageSetup pageKey="data-table" />

      <div className={styles.table}>
        <div className={classes(styles.th, styles.first_th)}><Checkbox /></div>
        <div className={classes(styles.th)}>
          {"Name"}
          <SortIcon />
        </div>
        {/* <div className={styles.}></div> */}
        <div className={classes(styles.th)}>
          {"Contact"}
          <SortIcon />
        </div>
        <div className={classes(styles.th, styles.last_th)}>
          {"Peers"}
        </div>

        {Array.from({ length: 25 }).map((_, idx) => (
          <Fragment key={idx}>
            <div className={classes(styles.td, styles.first_td)}><Checkbox /></div>
            <div className={classes(styles.td)}>{"Julia V. Gambuto"}</div>
            <div className={classes(styles.td)}>{"julia.vg@gmail.com"}</div>
            <div className={classes(styles.td, styles.last_td)}>{"John Doe"}</div>
          </Fragment>
        ))}
      </div>
    </main>
  );
};

export default Page;
