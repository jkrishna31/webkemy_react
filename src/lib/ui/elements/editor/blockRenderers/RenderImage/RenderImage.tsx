import Image from "next/image";

import { classes } from "@/lib/utils/style.utils";

import cStyles from "../block.module.scss";
import styles from "./RenderImage.module.scss";

const RenderImage = ({ block, edit, ...props }: any) => {
    return (
        <figure data-block className={classes(cStyles.block)} id={block.id}
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
