import React from "react";

import { PageSetup } from "@/components/managers";
import { Breadcrumb, type Crumb } from "@/lib/ui/elements/Breadcrumb";

import styles from "./styles.module.scss";

const crumbs: Crumb[] = [
  {
    key: "1",
    label: "Src",
    link: "#",
  },
  {
    key: "2",
    label: "Components",
    link: "#",
  },
  {
    key: "3",
    label: "",
    loading: true,
  },
  {
    key: "4",
    label: "Breadcrumb",
    link: "#",
    disabled: true,
  },
  {
    key: "5",
    label: "Breadcrumb.ts",
    link: "#",
    active: true,
  },
];

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="breadcrumb" />

      <Breadcrumb crumbs={crumbs} />
    </main>
  );
};

export default page;
