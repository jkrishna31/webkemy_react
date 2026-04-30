import { dummyMembers } from "@/data/dummy/chatData";
import { SearchForm } from "@/lib/components/blocks/search-form";
import { Avatar } from "@/lib/components/elements/avatar";
import { Button } from "@/lib/components/elements/buttton";
import { Dropdown } from "@/lib/components/elements/dropdown";
import { Item, ItemList } from "@/lib/components/elements/list-item";
import { Table } from "@/lib/components/elements/table";
import CopyIcon from "@/lib/svgs/icons/CopyIcon";
import EllipsisHIcon from "@/lib/svgs/icons/EllipsisHIcon";
import PlusIcon from "@/lib/svgs/icons/PlusIcon";

import styles from "./MembersPanel.module.scss";

const roleLabels = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
} as const;

export interface MembersPanel {
  onClose?: () => void;
}

const MembersPanel = ({
  onClose,
  ...restProps
}: MembersPanel) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Members"}</h3>
        <Button variant="solid" className={styles.add_btn}>
          <PlusIcon />
          {"Add"}
        </Button>
      </div>

      <SearchForm className={styles.search_form} placeholder="Search Member" />

      <div className={styles.content}>
        <Table rootClass={styles.table_wrapper}>
          <Table.Header isSticky style={{ zIndex: 5 }}>
            <tr>
              <Table.Cell>{"User"}</Table.Cell>
              <Table.Cell>{"Role"}</Table.Cell>
              <Table.Cell sticky="right" className={styles.last_col}>
                <Button className={styles.copy_btn}>
                  <CopyIcon />
                </Button>
              </Table.Cell>
            </tr>
          </Table.Header>
          <Table.Body>
            {dummyMembers.map(item => (
              <tr key={item.id}>
                <Table.Cell<"td"> as="td">
                  <div className={styles.user}>
                    <Avatar className={styles.profile} src={item.profile} alt={item.name} />
                    <div>
                      <p className={styles.name}>{item.name}</p>
                      <p className={styles.email}>{item.email}</p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell<"td"> as="td">
                  <Dropdown
                    triggerClass={styles.role_trigger}
                    dropdown={
                      <ItemList>
                        <Item label="Owner" selected={item.role === "owner"} />
                        <Item label="Admin" selected={item.role === "admin"} />
                        <Item label="Member" selected={item.role === "member"} />
                      </ItemList>
                    }
                  >
                    {(roleLabels as any)[item.role]}
                  </Dropdown>
                </Table.Cell>
                <Table.Cell<"td"> as="td" sticky="right" className={styles.last_col}>
                  <Button variant="muted" className={styles.action_btn}>
                    <EllipsisHIcon />
                  </Button>
                </Table.Cell>
              </tr>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MembersPanel;
