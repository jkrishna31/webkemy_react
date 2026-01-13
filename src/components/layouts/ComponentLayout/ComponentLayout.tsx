import { ReactNode } from "react";

import { AppSidebar } from "@/components/common/general";
import { AppLayout } from "@/components/layouts";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ComponentLayout.module.scss";

const ComponentLayout = ({ children, className }: Readonly<{ children?: ReactNode; className?: string }>) => {
  return (
    <AppLayout className={styles.layout}>
      <div className={classes(styles.wrapper, className)}>
        <AppSidebar className={styles.sidebar} />
        {children}
      </div>
    </AppLayout>
  );
};

export default ComponentLayout;
