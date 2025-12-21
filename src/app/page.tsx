import { Button } from "@/lib/ui/elements/butttons";
import { Text } from "@/lib/ui/elements/Text";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={styles.pattern_svg}>
        <defs>
          <pattern id="bg"
            patternUnits="userSpaceOnUse" width="24" height="24"
          // width=".013" height=".013" patternUnits="objectBoundingBox"
          >
            {/* <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.707 10.295a2.41 2.41 0 0 0 0 3.41l7.588 7.588a2.41 2.41 0 0 0 3.41 0l7.588-7.588a2.41 2.41 0 0 0 0-3.41l-7.588-7.588a2.41 2.41 0 0 0-3.41 0z" /> */}
            {/* <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m16.68 12.384l-4.22 5.063a.6.6 0 0 1-.92 0l-4.22-5.063a.6.6 0 0 1 0-.768l4.22-5.063a.6.6 0 0 1 .92 0l4.22 5.063a.6.6 0 0 1 0 .768M12 22v-2m0-16V2M4 12H2m20 0h-2" /> */}
            {/* <path fill="currentColor" d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2" /> */}
            {/* <path fill="currentColor" d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28z" /> */}
            {/* <path fill="currentColor" d="m12 9.5l1.2 4l2.8 3l-4-.9l-4.1.9l2.8-3zm0-6.9l-3 9.8l-7 7.5l10-2.3L22 20l-7-7.5z" /> */}
            {/* <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M12 2.844L9.19 9.22l-6.377 2.811l6.377 2.811L12 21.22l2.812-6.377l6.376-2.811l-6.376-2.811z" /> */}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)" />
      </svg>
      <div className={styles.card}>
        <Text<"h1"> as="h1" className={styles.title}>{"WEBKEMY"}</Text>
        <Text<"p"> as="p" className={styles.desc}>{"Minimal. Accessible. Easily-Extensible. React/NextJS Components."}</Text>
        <Button<"a"> variant="primary" href="/components">{"Components"}</Button>
      </div>
    </main>
  );
}
