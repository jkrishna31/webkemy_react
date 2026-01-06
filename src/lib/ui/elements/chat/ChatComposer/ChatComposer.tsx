import React, { ComponentProps, useCallback, useEffect, useRef, useState } from "react";

import { Keys } from "@/constants/keys.const";
import { useFiles } from "@/lib/hooks/useFiles";
import { EmojiPicker } from "@/lib/ui/elements/EmojiPicker";
import { FilesPreview } from "@/lib/ui/elements/FilesPreview";
import { FileInput } from "@/lib/ui/elements/inputs/FileInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { TextArea } from "@/lib/ui/elements/inputs/TextArea";
import { Popover } from "@/lib/ui/elements/Popover";
import AddEmojiIcon from "@/lib/ui/svgs/icons/AddEmojiIcon";
import MicIcon from "@/lib/ui/svgs/icons/MicIcon";
import PaperclipIcon from "@/lib/ui/svgs/icons/PaperclipIcon";
import SendSolidIcon from "@/lib/ui/svgs/icons/SendSolidIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatComposer.module.scss";

export interface ChatComposerProps extends ComponentProps<"div"> {
  onSend?: (value?: string) => void;
}

const ChatComposer = ({
  onSend, className,
  ...restProps
}: ChatComposerProps) => {
  const [query, setQuery] = useState<string>();
  const [emojiPickerAnchor, setEmojiPickerAnchor] = useState<HTMLElement | null>(null);
  const [entered, setEntered] = useState<boolean | "shift">(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { filelist, setFilelist, deleteFileByName } = useFiles();

  const handleFileInput = (e: any) => setFilelist(e.target.files);

  const handleSubmit = useCallback((value?: string) => {
    onSend?.(value);
    setQuery(undefined);
    inputRef.current?.focus();
  }, [onSend]);

  useEffect(() => {
    const inputElem = inputRef.current;
    if (inputElem) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === Keys.ENTER) setEntered(!e.shiftKey);
        else setEntered(false);
      };
      inputElem.addEventListener("keydown", handleKeyDown);
      return () => inputElem.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return (
    <div
      className={classes(styles.wrapper, className)}
      {...restProps}
    >
      <InputFieldWrapper className={styles.input_wrapper}>
        <FilesPreview
          files={Array.from(filelist?.length ? filelist : [])} mode="file" noHeading
          className={styles.files_preview}
          onDelete={deleteFileByName}
        />
        <TextArea
          rows={1}
          placeholder="Ask your query..."
          value={query}
          onInput={(e: any) => {
            const val = e.target.value;
            if (entered === true && val?.trim()?.length) {
              setEntered(false);
              handleSubmit(e.target.value);
            } else {
              setQuery(e.target.value);
            }
          }}
          ref={inputRef}
          className={styles.input}
        // enterKeyHint="send"
        />
        <div className={styles.controls}>
          <FileInput
            files={filelist}
            onInput={handleFileInput}
            multiple
            className={classes(styles.btn, styles.upload_btn)}
            minimal
          >
            <PaperclipIcon />
          </FileInput>
          <button
            className={classes(styles.btn, styles.emoji_btn)}
            aria-label="Add Emoji"
            title="Add Emoji"
            onClick={(e) => setEmojiPickerAnchor(emojiPickerAnchor ? null : (e.target as HTMLElement).closest("button"))}
          >
            <AddEmojiIcon className={styles.emoji_icon} />
          </button>
          <button
            className={classes(styles.btn, styles.mic_btn)}
            aria-label="Speak"
            title="Speak"
          >
            <MicIcon className={styles.mic_icon} />
          </button>
          <button
            className={classes(styles.btn, styles.submit_btn)}
            disabled={!query}
            aria-hidden={!query}
            onClick={() => handleSubmit(query)}
            aria-label="Send Message"
            title="Send (Ctrl+Enter)"
          >
            <SendSolidIcon />
          </button>
        </div>
      </InputFieldWrapper>
      {emojiPickerAnchor ? (
        <Popover
          anchor={emojiPickerAnchor}
          onClose={() => setEmojiPickerAnchor(null)}
          className={styles.emoji_popover}
          closeOnEsc
          trapFocus
        >
          <EmojiPicker />
        </Popover>
      ) : null}
    </div>
  );
};

export default ChatComposer;
