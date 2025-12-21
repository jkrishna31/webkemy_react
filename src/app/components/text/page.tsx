import React from "react";

import { PageSetup } from "@/components/managers";
import { Text } from "@/lib/ui/elements/Text";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="text" />

      <Text as="h1">{"Heading 1"}</Text>
      <Text as="h2">{"Heading 2"}</Text>
      <Text as="h3">{"Heading 3"}</Text>
      <Text as="h4">{"Heading 4"}</Text>
      <Text as="h5">{"Heading 5"}</Text>
      <Text as="h6">{"Heading 6"}</Text>
      <Text as="p">{"Paragraph"}</Text>
      <Text as="label">{"Block Label"}</Text>
      <Text as="label" inline>{"Inline Label"}</Text>
      <Text as="legend">{"Block Legend"}</Text>
      <Text as="legend" inline>{"Inline Legend"}</Text>
      <Text as="u">{"Underlined"}</Text>
      <Text as="mark">{"Marked"}</Text>
      <Text as="a">{"Anchor"}</Text>
      <Text as="code">{"Inline Code"}</Text>
      {/* <strong>{"Bold Text"}</strong>
      <em>{"Italicised Text"}</em>
      <s>{"Line-Through Text"}</s>
      <sub>{"Subscript"}</sub>
      <sup>{"Superscript"}</sup> */}
    </main>
  );
};

export default Page;
