import { ComponentPropsWithoutRef, RefObject, useCallback, useEffect, useEffectEvent, useRef, useState } from "react";

import { EmojiPicker } from "@/lib/components/elements/emoji-picker";
import { FileInput } from "@/lib/components/elements/file-input";
import { FilesPreview } from "@/lib/components/elements/files-preview";
import { InputItem } from "@/lib/components/elements/input-item";
import { Popover } from "@/lib/components/elements/popover";
import { TextArea } from "@/lib/components/elements/textarea";
import { Keys } from "@/lib/constants/keys";
import { useFiles } from "@/lib/hooks/useFiles";
import AddEmojiIcon from "@/lib/svgs/icons/AddEmojiIcon";
import MicOnIcon from "@/lib/svgs/icons/MicOnIcon";
import PaperclipIcon from "@/lib/svgs/icons/PaperclipIcon";
import SendIcon from "@/lib/svgs/icons/SendIcon";
import { isMobileDevice } from "@/lib/utils/client";
import { mergeRefs } from "@/lib/utils/react";
import { classes } from "@/lib/utils/style";

import styles from "./ChatComposer.module.scss";

export interface ChatComposerProps extends ComponentPropsWithoutRef<"div"> {
  onSend?: (value?: string) => void;
  ref?: RefObject<HTMLTextAreaElement | null>;
}

const ChatComposer = ({
  onSend, className, children, ref,
  ...restProps
}: ChatComposerProps) => {
  const [query, setQuery] = useState<string>();
  const [emojiPickerAnchor, setEmojiPickerAnchor] = useState<HTMLElement | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { filelist, setFilelist, deleteFileByName } = useFiles();

  const handleFileInput = (e: any) => setFilelist(e.target.files);

  const handleSubmit = useCallback((value?: string) => {
    if (value?.trim().length) {
      onSend?.(value);
      setQuery(undefined);
      inputRef.current?.focus();
    }
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
      <InputItem.FieldWrapper className={styles.wrapper_inner}>
        {children}
        <FilesPreview
          files={Array.from(filelist?.length ? filelist : [])}
          noHeading
          className={styles.files_preview}
          onDelete={deleteFileByName}
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

          <TextArea
            rows={1}
            placeholder="Message..."
            value={query}
            onInput={(e: any) => setQuery(e.target.value)}
            ref={mergeRefs(inputRef, ref)}
            className={classes(styles.input, query?.trim().length && styles.max)}
          // enterKeyHint="send"
          />

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
      </InputItem.FieldWrapper>
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
