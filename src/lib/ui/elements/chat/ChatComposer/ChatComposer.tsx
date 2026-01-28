import { ComponentProps, useCallback, useEffect, useEffectEvent, useRef, useState } from "react";

import { Keys } from "@/constants/keys.const";
import { useFiles } from "@/lib/hooks/useFiles";
import { EmojiPicker } from "@/lib/ui/elements/EmojiPicker";
import { FilesPreview } from "@/lib/ui/elements/FilesPreview";
import { FileInput } from "@/lib/ui/elements/inputs/FileInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { TextArea } from "@/lib/ui/elements/inputs/TextArea";
import { Popover } from "@/lib/ui/elements/Popover";
import AddEmojiIcon from "@/lib/ui/svgs/icons/AddEmojiIcon";
import MicOnIcon from "@/lib/ui/svgs/icons/MicOnIcon";
import PaperclipIcon from "@/lib/ui/svgs/icons/PaperclipIcon";
import SendIcon from "@/lib/ui/svgs/icons/SendIcon";
import { isMobileDevice } from "@/lib/utils/client.utils";
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

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { filelist, setFilelist, deleteFileByName } = useFiles();

  const handleFileInput = (e: any) => setFilelist(e.target.files);

  const handleSubmit = useCallback((value?: string) => {
    onSend?.(value);
    setQuery(undefined);
    inputRef.current?.focus();
  }, [onSend]);

  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === Keys.ENTER && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(query);
    }
  });

  useEffect(() => {
    const inputElem = inputRef.current;
    if (inputElem && !isMobileDevice()) {
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
          onInput={(e: any) => setQuery(e.target.value)}
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
            <MicOnIcon className={styles.mic_icon} />
          </button>
          <button
            className={classes(styles.btn, styles.submit_btn)}
            disabled={!query}
            aria-hidden={!query}
            onClick={() => handleSubmit(query)}
            aria-label="Send Message"
            title="Send (Ctrl+Enter)"
          >
            <SendIcon />
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
