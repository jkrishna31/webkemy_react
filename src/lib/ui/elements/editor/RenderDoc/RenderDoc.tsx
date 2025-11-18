import docStyles from "@/lib/ui/styles/classes/doc.module.scss";
import { classes } from "@/lib/utils/style.utils";

import { RenderBlock } from "../blockRenderers";
import styles from "./RenderDoc.module.scss";

const RenderDoc = ({ post, ...props }: any) => {
    return (
        <div className={classes(docStyles.doc, styles.render_post)}>
            {
                post.blocks?.map((block: any, index: number) => {
                    return (
                        <RenderBlock data={block} key={index} {...props} />
                    );
                })
            }
        </div>
    );
};

export default RenderDoc;
