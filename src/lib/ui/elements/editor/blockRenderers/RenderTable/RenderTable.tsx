import { classes } from "@/lib/utils/style.utils";

import cStyles from "../block.module.scss";
import styles from "./RenderTable.module.scss";

const RenderTable = ({ block, ...props }: any) => {
    const renderCell = (payload: any, header = false, key?: any) => {
        return header ? (
            <th className={classes(styles.cell, header && styles.header_cell)} key={"cell" + key}>
                <div className={styles.hc_content}>
                    {payload.data}
                    {/* {
                        key === 0 ? (
                            <Button className={styles.stick_btn}>
                                <ArrowLeftBar className={styles.left_icon} />
                            </Button>
                        ) : null
                    } */}
                </div>
            </th>
        ) : (
            <td className={styles.cell} key={"cell" + key}>
                {payload.data}
            </td>
        );
    };

    const renderRow = (row: any, key?: any) => {
        return (
            <tr className={classes(styles.row, row.isHeader && styles.header_row)} key={"row" + key}>
                {
                    row.cells.map((cell: any, index: number) => {
                        return renderCell(cell, row.isHeader, index);
                    })
                }
            </tr>
        );
    };

    return (
        <div data-block className={classes(styles.table_wrapper, cStyles.block)} id={block.id}>
            <table className={classes(styles.data_table, styles.sticky_fr)}>
                <caption className={styles.table_caption}>
                    {block.data?.caption}
                </caption>
                <tbody>
                    {
                        block.data?.rows.map((row: any, index: number) => {
                            return renderRow(row, index);
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default RenderTable;
