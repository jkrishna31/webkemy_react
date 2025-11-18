import { classes } from "@/lib/utils/style.utils";

import cStyles from "../block.module.scss";
import styles from "./RenderSubheading.module.scss";

const RenderSubheading = ({ block, edit, ...props }: any) => {
    return (
        <h3 data-block className={classes(cStyles.block, !block.data?.length && cStyles.empty)} id={block.id} {...props}>
            {block.data}
            {(!block.data && edit) ? <br /> : null}
        </h3>
    );
};

export default RenderSubheading;
