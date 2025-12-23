import React from "react";

import { PageSetup } from "@/components/managers";
import { Resizable } from "@/lib/ui/elements/Resizable";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="resizable" />

      <Resizable
        className={styles.resizable}
        allowedResizers={["l", "r", "t", "b", "tl", "br", "bl", "tr"]}
      >
        <div className={styles.content}>
          {"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione tempore ducimus sed laborum totam commodi reiciendis, aspernatur explicabo facilis necessitatibus libero deserunt amet praesentium enim, rerum assumenda consequuntur consequatur cumque nobis dolore debitis delectus inventore itaque. Temporibus, iure. Numquam, quibusdam expedita at, accusamus voluptas, temporibus illum ullam repudiandae necessitatibus nulla obcaecati ipsa reiciendis asperiores vitae tempora! Eius error velit quae illo libero reprehenderit molestiae ratione, aut sed assumenda laboriosam repellendus omnis maiores tempora porro non architecto odit doloremque sint inventore. Vero obcaecati nostrum quos, aperiam libero iusto. Ea molestias delectus natus perspiciatis enim, facere explicabo autem rerum non debitis eos."}
        </div>
      </Resizable>
    </main>
  );
};

export default Page;
