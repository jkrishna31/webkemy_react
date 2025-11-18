import { classes } from "@/lib/utils/style.utils";

import cStyles from "../block.module.scss";
import styles from "./RenderHeading.module.scss";

const RenderHeading = ({ block, edit, ...props }: any) => {
    return (
        <h2 data-block className={classes(cStyles.block, !block.data?.length && cStyles.empty)} id={block.id} {...props}>
            {block.data}
            {(!block.data && edit) ? <br></br> : null}
        </h2>
    );
};

export default RenderHeading;
