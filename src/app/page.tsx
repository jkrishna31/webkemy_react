import { Button } from "@/lib/components/elements/butttons";
import { Text } from "@/lib/components/elements/text";
import AppLogo from "@/lib/svgs/logos/AppLogo";
import CornerFoldShape from "@/lib/svgs/misc/CornerFoldShape";
import { classes } from "@/lib/utils/style";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={classes(styles.mark, styles.mark_top)}></div>
      <div className={classes(styles.mark, styles.mark_right)}></div>
      <div className={classes(styles.mark, styles.mark_bottom)}></div>
      <div className={classes(styles.mark, styles.mark_left)}></div>

      {/* <div className={styles.shapes}></div> */}
      <CornerFoldShape className={classes(styles.shape, styles.shape_tl)} />
      <CornerFoldShape className={classes(styles.shape, styles.shape_tr)} />
      <CornerFoldShape className={classes(styles.shape, styles.shape_bl)} />
      <CornerFoldShape className={classes(styles.shape, styles.shape_br)} />

      <div className={styles.card_wrapper}>
        <div className={styles.card}>
          <Text<"h1"> as="h1" className={styles.title}>
            {"WEBKEMY"}
            {/* <AppLogo className={styles.logo} /> */}
          </Text>
          <Text<"p"> as="p" className={styles.desc}>{"Minimal. Accessible. Responsive. Extensible. UI Elements."}</Text>
          <Button<"a"> variant="solid" href="/components">{"Components"}</Button>
        </div>
      </div>
    </main>
  );
}
