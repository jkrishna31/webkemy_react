import "./styles.scss";

import { ReactNode } from "react";

import { ComponentLayout } from "@/components/layouts";

const Layout = ({
  children
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <ComponentLayout>
      <div className="wrapper">
        {children}
      </div>
    </ComponentLayout>
  );
};

export default Layout;
