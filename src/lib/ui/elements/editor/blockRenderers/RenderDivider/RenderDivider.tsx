import cStyles from "../block.module.scss";
import styles from "./RenderDivider.module.scss";

const RenderDivider = ({ block, ...props }: any) => {
    return (
        <hr data-block className={`${cStyles.block}`} contentEditable={false} id={block.id} />
    );
};

export default RenderDivider;
