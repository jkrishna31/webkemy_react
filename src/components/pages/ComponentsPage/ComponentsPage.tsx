import Link from "next/link";

import { menuItems } from "@/components/common/app";
import { Text } from "@/lib/components/elements/text";

import styles from "./ComponentsPage.module.scss";

const ComponentsPage = () => {
  return (
    <main className={styles.main}>
      <Text<"h1"> as="h1">{"All Components"}</Text>
      <Text className={styles.desc}>{"More coming."}</Text>

      {
        menuItems.map((group, idx) => idx > 3 ? null : (
          <div className={styles.section} key={group.key}>
            <Text className={styles.group}>{group.group}</Text>
            <ul>
              {
                group.menu.map((item: any) => item.disabled ? null : (
                  <Link href={item.href} key={item.key}>
                    {item.icon}
                    {item.label}
                  </Link>
                ))
              }

            </ul>
          </div>
        ))
      }
    </main>
  );
};

export default ComponentsPage;
