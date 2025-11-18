import { RenderInline } from "@/lib/ui/elements/editor/inlineRenderers";
import { classes } from "@/lib/utils/style.utils";

import cStyles from "../block.module.scss";
import styles from "./RenderPara.module.scss";

const RenderPara = ({ block, edit, ...props }: any) => {
    return (
        <p data-block className={classes(cStyles.block, !block.data?.length && cStyles.empty)} id={block.id} {...props}>
            {block.data?.map((pi: any, idx: number) => <RenderInline key={idx} payload={pi} />)}
            {(!block.data?.length && edit) ? <br></br> : null}
        </p>
    );
};

export default RenderPara;
