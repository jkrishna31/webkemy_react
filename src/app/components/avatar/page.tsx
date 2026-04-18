import { PageSetup } from "@/components/managers";
import { Avatar, AvatarList } from "@/lib/components/elements/avatar";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="avatar" />

      <Avatar src="https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="avatar" />

      <AvatarList
        avatars={[
          {
            id: "1",
            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "",
          },
          {
            id: "2",
            src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "",
          },
          {
            id: "3",
            src: "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "",
          },
          {
            id: "4",
            src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "",
          },
          {
            id: "5",
            src: "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "",
          },
        ]}
      />
    </main>
  );
};

export default page;
