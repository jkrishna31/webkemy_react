import { PageSetup } from "@/components/managers";
import { CodeBlock, LineHighlight } from "@/lib/ui/elements/CodeBlock";

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

const codes1Highlight: Array<LineHighlight> = [[4, 7]];
const codes2Highlight: Array<LineHighlight> = [{ line: [4, 7], type: "+" }, { line: [10, 12], type: "-" }];

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="code-block" />

      <CodeBlock
        controls={false} numbered={false}
        data={codes1} title="Directory Structure" highlights={codes1Highlight}
        className={styles.code}
      />
      <CodeBlock
        data={codes2} title="index.html" highlights={codes2Highlight}
        className={styles.code}
      />
    </main>
  );
};

export default Page;
