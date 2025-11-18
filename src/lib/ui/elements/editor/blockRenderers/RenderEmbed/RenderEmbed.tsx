import { editorBlocks as b } from "@/constants/editor.const";
import { classes } from "@/lib/utils/style.utils";

import cStyles from "../block.module.scss";
import styles from "./RenderEmbed.module.scss";

const RenderEmbed = ({ block, ...props }: any) => {
    // ?fs=0&modestbranding=1&playsinline=1&rel=0
    // fs=0: hides the fullscreen button
    // modestbranding=1: hides YouTube's logo
    // playsinline=1: prevents iOS from playing the video full-screen
    // rel=0: shows the related videos only from the same channel

    const getClass = () => {
        switch (block.type) {
            case b.YOUTUBE:
                return styles.yt;
            case b.GITHUB:
                return styles.gh;
            case b.CODEPEN:
                return styles.cp;
            case b.CODESANDBOX:
                return styles.csb;
        }
    };

    return (
        <div data-block className={classes(cStyles.block, styles.data_iframe, getClass())} id={block.id}>
            <iframe
                width="100%" height="100%"
                src={block.src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                frameBorder={0}
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                className={styles.iframe}
            ></iframe>
        </div>
    );
};

export default RenderEmbed;
