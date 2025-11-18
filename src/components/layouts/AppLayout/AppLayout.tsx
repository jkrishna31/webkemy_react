import { ComponentProps } from "react";

import { AppHeader } from "@/components/common/general";
import { ClientSetup } from "@/components/managers";
import { classes } from "@/lib/utils/style.utils";

import styles from "./AppLayout.module.scss";

const AppLayout = ({ children, className, ...props }: ComponentProps<"div">) => {
    return (
        <div className={classes(styles.layout, className)} {...props}>
            <AppHeader />
            {children}
            <ClientSetup />
        </div>
    );
};

export default AppLayout;
