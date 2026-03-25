import { PageSetup } from "@/components/managers";
import { Button } from "@/lib/components/elements/butttons";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="button" />

      <div className={styles.btns}>
        <Button variant="solid">{"Solid"}</Button>
        <Button variant="solid" color="red">{"Solid"}</Button>
        <Button variant="solid" color="orange">{"Solid"}</Button>
        <Button variant="solid" color="yellow">{"Solid"}</Button>
        <Button variant="solid" color="green">{"Solid"}</Button>
        <Button variant="solid" color="blue">{"Solid"}</Button>
        <Button variant="solid" color="purple">{"Solid"}</Button>
        <Button variant="solid" color="pink">{"Solid"}</Button>
      </div>
      <div className={styles.btns}>
        <Button variant="outlined">{"Outlined"}</Button>
        <Button variant="outlined" color="red">{"Outlined"}</Button>
        <Button variant="outlined" color="orange">{"Outlined"}</Button>
        <Button variant="outlined" color="yellow">{"Outlined"}</Button>
        <Button variant="outlined" color="green">{"Outlined"}</Button>
        <Button variant="outlined" color="blue">{"Outlined"}</Button>
        <Button variant="outlined" color="purple">{"Outlined"}</Button>
        <Button variant="outlined" color="pink">{"Outlined"}</Button>
      </div>
      <div className={styles.btns}>
        <Button variant="muted">{"Muted"}</Button>
        <Button variant="muted" color="red">{"Muted"}</Button>
        <Button variant="muted" color="orange">{"Muted"}</Button>
        <Button variant="muted" color="yellow">{"Muted"}</Button>
        <Button variant="muted" color="green">{"Muted"}</Button>
        <Button variant="muted" color="blue">{"Muted"}</Button>
        <Button variant="muted" color="purple">{"Muted"}</Button>
        <Button variant="muted" color="pink">{"Muted"}</Button>
      </div>
      <div className={styles.btns}>
        <Button variant="text">{"Text"}</Button>
        <Button variant="text" color="red">{"Text"}</Button>
        <Button variant="text" color="orange">{"Text"}</Button>
        <Button variant="text" color="yellow">{"Text"}</Button>
        <Button variant="text" color="green">{"Text"}</Button>
        <Button variant="text" color="blue">{"Text"}</Button>
        <Button variant="text" color="purple">{"Text"}</Button>
        <Button variant="text" color="pink">{"Text"}</Button>
      </div>

    </main>
  );
};

export default Page;
