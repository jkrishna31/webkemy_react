import Image from "next/image";
import React from "react";

import { PageSetup } from "@/components/managers";
import { AvatarList } from "@/lib/ui/elements/avatar";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="avatar" />

      <AvatarList
        avatars={[
          {
            id: "1", children: (
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={40} height={40}
                className={styles.img}
              />
            ),
          },
          {
            id: "2", children: (
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={40} height={40}
                className={styles.img}
              />
            ),
          },
          {
            id: "3", children: (
              <Image
                src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={40} height={40}
                className={styles.img}
              />
            ),
          },
          {
            id: "4", children: (
              <Image
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={40} height={40}
                className={styles.img}
              />
            ),
          },
          {
            id: "5", children: (
              <Image
                src="https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={40} height={40}
                className={styles.img}
              />
            ),
          },
        ]}
      />
    </main>
  );
};

export default page;
