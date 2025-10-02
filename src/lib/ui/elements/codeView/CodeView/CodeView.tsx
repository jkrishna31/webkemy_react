"use client";

import React, { useState } from "react";

import { useToastActions } from "@/data/stores";
import { Button } from "@/lib/ui/elements/butttons";
import { CopyIcon, WrapOffIcon, WrapOnIcon } from "@/lib/ui/svgs/icons";
import { copyToClipboard } from "@/lib/utils/client.utils";
import { getUniqueId } from "@/lib/utils/crypto.utils";

import styles from "./CodeView.module.scss";

export type LineHighlight = number | [number?, number?] | {
  line: number | [number?, number?];
  type: "+" | "-";
};

export interface CodeViewProps {
  controls?: boolean;
  title?: string;
  numbered?: boolean;
  data?: string[] | string;
  className?: string;
  highlights?: LineHighlight[];
}

const getHighlight = (line: number, highlights?: Array<[LineHighlight?, LineHighlight?] | LineHighlight>): "+" | "-" | true | undefined => {
  if (!highlights?.length) return;
  // todo: sorted hightlights for improved performance
  for (const highlight of highlights) {
    if (typeof highlight === "number" && line === highlight) {
      return true;
    } else if (Array.isArray(highlight)) {
      let highlighted = true;
      if (highlight[0] && line < (highlight[0] as number)) highlighted = false;
      if (highlight[1] && line > (highlight[1] as number)) highlighted = false;
      if (highlighted) return true;
    } else if (typeof highlight === "object") {
      if (typeof highlight.line === "number" && highlight.line === line) return highlight.type;
      if (Array.isArray(highlight.line)) {
        let highlighted: string | boolean = highlight.type;
        if (highlight.line[0] && line < (highlight.line[0] as number)) highlighted = false;
        if (highlight.line[1] && line > (highlight.line[1] as number)) highlighted = false;
        if (highlighted) return highlight.type;
      }
    }
  }
  return;
};

const CodeView = ({
  className,
  controls = true, numbered = true, highlights,
  title, data,
}: CodeViewProps) => {
  const { addToast } = useToastActions();

  const [wrap, setWrap] = useState(false);

  const code = Array.isArray(data) ? data : data?.split("\n");

  const handleCopy = () => {
    const codeToCopy = code?.join("\n") ?? "";
    copyToClipboard(codeToCopy)
      .then(() => {
        addToast({
          id: getUniqueId(),
          message: "Copied to Clipboard!",
          timeout: 3000,
        });
      })
      .catch(() => {
        addToast({
          id: getUniqueId(),
          message: "Failed to copy!",
          timeout: 3000,
          type: "error",
        });
      });
  };

  const codeControls = () => {
    if (!controls) return null;
    return (
      <div className={styles.code_controls}>
        <Button
          className={styles.control_btn}
          icon={<CopyIcon className={styles.copy_icon} />}
          title="Copy to Clipboard"
          onClick={handleCopy}
        />
        <Button
          className={styles.control_btn}
          icon={
            wrap ? (
              <WrapOnIcon className={styles.wrap_icon} />
            ) : (
              <WrapOffIcon className={styles.wrap_icon} />
            )
          }
          title="Wrap On/Off"
          onClick={() => setWrap(!wrap)}
        />
      </div>
    );
  };

  return (
    <div className={`${styles.code_wrapper} ${className}`}>
      {
        (controls || title) ? (
          <div className={styles.header}>
            {title ? (
              <h3 className={styles.filename}>{title}</h3>
            ) : null}
            {codeControls()}
          </div>
        ) : null
      }
      <div className={styles.code_container}>
        <table className={styles.code_table} role="presentation">
          <tbody>
            {
              code?.map((item: string, idx: number) => {
                const highlight = getHighlight(idx + 1, highlights);
                return (
                  <tr
                    key={idx}
                    className={`${styles.code_row} `}
                    data-highlight={highlight}
                  >
                    {
                      (numbered || highlights?.length) ? (
                        <td className={styles.number_col}>
                          <div>
                            {highlight === "+" || highlight === "-" ? <span className={styles.highlight}>{highlight}</span> : null}
                            {numbered ? <span className={styles.line}>{idx + 1}</span> : null}
                          </div>
                        </td>
                      ) : null
                    }
                    <td className={`${styles.code_col} ${styles.code_cell} ${(!numbered && !highlights?.length) ? styles.pl : ""}`}>
                      <pre className={`${styles.pre} ${wrap ? styles.wrap : null} `}>
                        <span>{item}</span>
                      </pre>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeView;
