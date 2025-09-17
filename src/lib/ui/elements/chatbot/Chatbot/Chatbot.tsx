"use client";

import React, { useEffect, useState } from "react";

import { useFocusRestore } from "@/lib/hooks";
import { BotMessageIcon, CrossIcon } from "@/lib/ui/svgs/icons";

import { ChatContainer } from "..";
import styles from "./Chatbot.module.scss";

const defaultMessages = [
  "Hi there 👋!",
  "Need any help? Let me know.",
];

export const PreviewMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.card}>
      <p>{message}</p>
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const { onOpen, onClose } = useFocusRestore();

  const clearPreviews = () => {
    setPreviews([]);
  };

  useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isOpen, onClose, onOpen]);

  useEffect(() => {
    setTimeout(() => {
      setPreviews(defaultMessages);
    }, 1000);
  }, []);

  // add new message preview as well if main container is not open

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_inner}>
        {
          isOpen ? (
            <ChatContainer onClose={() => setIsOpen(false)} />
          ) : null
        }
        {
          (!isOpen && previews.length) ? (
            <div className={styles.previews_container}>
              <button onClick={clearPreviews} className={styles.preview_clear_btn}>
                <CrossIcon />
              </button>
              {
                previews.map((preview) => (
                  <PreviewMessage message={preview} key={preview} />
                ))
              }
            </div>
          ) : null
        }
        <button className={styles.btn} onClick={() => setIsOpen(!isOpen)}>
          {
            isOpen ? (
              <CrossIcon />
            ) : (
              <BotMessageIcon />
            )
          }
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
