"use client";

import Image from "next/image";
import { useState } from "react";

import cStyles from "../block.module.scss";
import styles from "./RenderImage.module.scss";

const RenderImage = ({ block, edit, ...props }: any) => {
    const [zoom, setZoom] = useState(false);

    return (
        <figure data-block className={`${cStyles.block} ${zoom ? styles.zoom : ""}`} id={block.id}
        // onClick={() => setZoom(!zoom)}
        >
            <Image src={block.src} width={400} height={300} alt="post title" />
            <figcaption>
                {block.caption}
                {(!block.caption && edit) ? <br></br> : null}
            </figcaption>
        </figure>
    );
};

export default RenderImage;
