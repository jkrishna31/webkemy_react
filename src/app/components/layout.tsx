import React, { ReactNode } from "react";

import { ComponentLayout } from "@/components/layouts";

import styles from "./styles.module.scss";

const Layout = ({
  children
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <ComponentLayout>
      <div className={styles.wrapper}>
        {children}
      </div>
    </ComponentLayout>
  );
};

export default Layout;
