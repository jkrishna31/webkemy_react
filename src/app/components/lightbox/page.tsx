"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Button } from "@/lib/components/elements/butttons";
import { MediaViewer } from "@/lib/components/elements/chat/MediaViewer";

import styles from "./page.module.scss";

const media = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1733598479294-10c9e190a099?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "",
    size: 0,
    type: "image",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1770387795112-e2b476b15f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2NzR8fHxlbnwwfHx8fHw%3D",
    name: "",
    size: 0,
    type: "image",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1646688821973-72fc89444b32?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "",
    size: 0,
    type: "image",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww",
    name: "",
    size: 0,
    type: "image",
  },
  {
    id: "5",
    src: "/assets/sample-local-pdf.pdf",
    name: "ADA Health History.pdf",
    size: 0,
    type: "pdf",
  },
  {
    id: "6",
    src: "/assets/sample-zip-file.zip",
    name: "rss(1).zip",
    size: 0,
    type: "zip",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "",
    size: 0,
    type: "image",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1643330683233-ff2ac89b002c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29sYXIlMjBzeXN0ZW18ZW58MHx8MHx8fDA%3D",
    name: "",
    size: 0,
    type: "image",
  }
];

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="lightbox" />

      <Button variant="outlined" onClick={() => setOpen(true)}>
        {"Open Lightbox"}
      </Button>

      {
        open ? (
          <MediaViewer
            open={open}
            onClose={() => setOpen(false)}
            media={media}
          />
        ) : null
      }
    </main>
  );
};

export default Page;
