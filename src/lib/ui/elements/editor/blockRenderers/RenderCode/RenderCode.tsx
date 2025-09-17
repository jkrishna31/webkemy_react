"use client";

import React, { useState } from "react";

import { useToastActions } from "@/data/stores";
import { Button } from "@/lib/ui/elements/butttons";
import { CopyIcon, WrapOffIcon, WrapOnIcon } from "@/lib/ui/svgs/icons";
import { copyToClipboard } from "@/lib/utils/client.utils";
import { getUniqueId } from "@/lib/utils/crypto.utils";

import cStyles from "../block.module.scss";
import styles from "./RenderCode.module.scss";

const RenderCode = ({ block, ...props }: any) => {
  const { addToast } = useToastActions();

  const [wrap, setWrap] = useState(false);

  const handleCopy = () => {
    const codeToCopy = block?.data?.join("\n");
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

  /*
    grammar = {
        comments: {
            single
        }
    }
    = tokens
      > comments
          ~ single-line: //, #, ...
          ~ multi-line: \/* *\/, < !-- -->
      > literals
          ~predefined: true, false, null, ...
          ~custom: 5, "hello", 4.56, ...
      > operators
          ~[math]: =, /, ...
          ~[other]:
          ~[custom_name]:
          ~[brackets]: (), {}, [], <>, ``, "", ''
      > keywords
          ~ class, function, let, const, ...
      > identifiers
          ~ variable, function, class names
            = split on space or newline (splitting on space will cause issue for bracket types)
            = go on character-wise
          ~ character has no special meaning
            + append it to the buffer
          ~ character has a special meaning
            + it is a opening bracket/quote
            + it is a closing bracket/quote
            + it is a delimiter like comma, space, newline
          ~ character can have special meaning ()
            + check from the end of the buffer stack if including makes it special
            + otherwise append it to the buffer
  */

  const codeControls = () => {
    return block.hideControls ? null : (
      <div className={styles.code_controls} contentEditable={false}>
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

  /*
    === CODE PARSER
      > lang -> file exts + categorizer
      > categories
          + keywords
          + variables/identifier
          + operators
          + strings "..."
          + braces
          + comments (#, /* *\/, /** *\/, <!-- -->, //)
      > stages
          + detect lang (file extensions mapping with lang)
          + use lang specific parser (if not detected, use default parser)
  */

  return (
    <div data-block className={`${cStyles.block} ${styles.code_wrapper}`} id={block.id}>
      {
        block.filename || !block.hideControls ? (
          <div className={styles.header}>
            {block.filename ? (
              <h3 className={styles.filename}>{block.filename}</h3>
            ) : null}
            {codeControls()}
          </div>
        ) : null
      }
      <div className={styles.code_container}>
        <table className={styles.code_table} role="presentation">
          <tbody>
            {
              block.data?.map((item: string, idx: number) => (
                <tr className={`${styles.code_row} `} key={idx}>
                  {
                    block.lineNumber ? (
                      <td className={`${styles.number_col} ${styles.number_cell}`} contentEditable={false}>
                        <span>{idx + 1}</span>
                      </td>
                    ) : null
                  }
                  <td className={`${styles.code_col} ${styles.code_cell} ${!block.lineNumber ? styles.pl : ""}`}>
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

export default RenderCode;
