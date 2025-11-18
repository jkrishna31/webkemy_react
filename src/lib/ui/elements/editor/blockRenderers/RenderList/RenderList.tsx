import { classes } from "@/lib/utils/style.utils";

import cStyles from "../block.module.scss";
import styles from "./RenderList.module.scss";

const RenderList = ({ block, ...props }: any) => {
    const renderLI = (payload: any, nest: number) => {
        return (
            <li className={styles.data_list_item} key={"li" + nest + payload.key}>
                <p className={styles.list_item_span}>{payload.data}</p>
                {
                    payload.subdata ? (
                        <RenderNestedList type={payload.subdata.type} nest={nest}>
                            {
                                payload.subdata.list.map((sdu: any) => {
                                    return renderLI(sdu, nest + 1);
                                })
                            }
                        </RenderNestedList>
                    ) : null
                }
            </li>
        );
    };

    const renderList = () => {
        if (block.type === "ordered_list") {
            return (
                <ol className={classes(cStyles.block, styles.root_o_list, styles.data_list)} id={block.id}>
                    {
                        block?.list.map((listItem: any) => {
                            return renderLI(listItem, 1);
                        })
                    }
                </ol>
            );
        } else {
            return (
                <ul className={classes(cStyles.block, styles.root_u_list, styles.data_list)} id={block.id}>
                    {
                        block?.list.map((listItem: any, index: number) => {
                            return renderLI(listItem, 1);
                        })
                    }
                </ul>
            );
        }
    };

    return renderList();
};

const RenderNestedList = (props: any) => {
    return props.type == "ordered_list" ? (
        <ol data-block className={classes(styles.data_list, styles.data_nested_list)}>
            {props.children}
        </ol>
    ) : (
        <ul data-block className={classes(styles.data_list, styles.data_nested_list)}>
            {props.children}
        </ul>
    );
};

export default RenderList;
