import React from "react";

import { PageSetup } from "@/components/managers";
import { CodeView } from "@/lib/ui/elements/codeView";

import styles from "./styles.module.scss";

const codes1 = [
  "src/",
  "├── adapters/",
  "│   └── apiAdapter.js",
  "├── components/",
  "│   └── ItemsComponent.js",
  "├── repositories/",
  "│   └── dataRepository.js",
  "├── services/",
  "│   └── apiService.js",
  "├── App.js",
  "└── index.js",
];

const codes2 = [
  "<div class=\"item-screen\">",
  "   <div class=\"bag\">",
  "       <div class=\"bag-details\">",
  "           <div class=\"bag-section-title\"></div>",
  "           <div class=\"bag-section-image\">",
  "               <img src=\"img/item-shadow.png\" />",
  "           </div>",
  "       </div>",
  "       <div class=\"item-list\">",
  "           <ul>",
  "               <li>Antidote</li>",
  "           </ul>",
  "       </div>",
  "   </div>",
  "</div>",
];

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="code-view" />

      <CodeView
        controls={false} numbered={false}
        data={codes1} title="Directory Structure"
        className={styles.code}
      />
      <CodeView
        data={codes2} title="index.html"
        className={styles.code}
      />
    </main>
  );
};

export default Page;
