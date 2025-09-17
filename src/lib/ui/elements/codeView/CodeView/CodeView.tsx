"use client";

import React, { useState } from "react";

import { useToastActions } from "@/data/stores";
import { Button } from "@/lib/ui/elements/butttons";
import { CopyIcon, WrapOffIcon, WrapOnIcon } from "@/lib/ui/svgs/icons";
import { copyToClipboard } from "@/lib/utils/client.utils";
import { getUniqueId } from "@/lib/utils/crypto.utils";

import styles from "./CodeView.module.scss";

export interface CodeViewProps {
  controls?: boolean
  title?: string
  numbered?: boolean
  data?: string[] | string
  className?: string
}

const CodeView = ({
  className,
  controls = true, numbered = true,
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
              code?.map((item: string, idx: number) => (
                <tr className={`${styles.code_row} `} key={idx}>
                  {
                    numbered ? (
                      <td className={`${styles.number_col} ${styles.number_cell}`} contentEditable={false}>
                        <span>{idx + 1}</span>
                      </td>
                    ) : null
                  }
                  <td className={`${styles.code_col} ${styles.code_cell} ${!numbered ? styles.pl : ""}`}>
                    <pre className={`${styles.pre} ${wrap ? styles.wrap : null} `}>
                      <span>{item}</span>
                    </pre>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeView;
