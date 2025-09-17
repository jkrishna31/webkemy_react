import cStyles from "../block.module.scss";
import styles from "./RenderBox.module.scss";

const RenderBox = ({ block, ...props }: any) => {
    const renderTip = () => {
        return (
            <div data-block className={`${cStyles.block} ${styles.box} ${styles.tip}`} id={block.id}>
                <b className={`${styles.box_title}`} contentEditable={false}>{"Tip"}</b>
                <span className={`${styles.data_span} ${styles.data_tip}`}>{block.data}</span>
            </div>
        );
    };

    const renderNote = () => {
        return (
            <div data-block className={`${cStyles.block} ${styles.box} ${styles.note}`} id={block.id}>
                <b className={`${styles.box_title}`} contentEditable={false}>{"Note"}</b>
                <span className={`${styles.data_span} ${styles.data_note}`}>{block.data}</span>
            </div>
        );
    };

    const renderCaution = () => {
        return (
            <div data-block className={`${cStyles.block} ${styles.box} ${styles.caution}`} id={block.id}>
                <b className={`${styles.box_title}`} contentEditable={false}>{"Caution"}</b>
                <span className={`${styles.data_span} ${styles.data_caution}`}>{block.data}</span>
            </div>
        );
    };

    const renderQuote = () => {
        return (
            <blockquote data-block className={`${cStyles.block} ${styles.box} ${styles.quote}`} id={block.id}>
                <span className={`${styles.data_span} ${styles.data_quote}`}>
                    {block.data}
                </span>
            </blockquote>
        );
    };

    switch (block.type) {
        case "tip":
            return renderTip();
        case "note":
            return renderNote();
        case "caution":
            return renderCaution();
        case "quote":
            return renderQuote();
        default:
            return null;
    }
};

export default RenderBox;
