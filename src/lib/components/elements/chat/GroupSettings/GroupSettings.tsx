import { Checkbox } from "@/lib/components/elements/checkbox";
import { Table } from "@/lib/components/elements/table";
import { classes } from "@/lib/utils/style";

import styles from "./GroupSettings.module.scss";

const roles = [
  { id: "owner", label: "Owner" },
  { id: "manager", label: "Manager" },
  { id: "member", label: "Member" },
];

const permissions = [
  { id: "post", label: "Post" },
  { id: "use_all", label: "Use @all" },
  { id: "manage_members", label: "Manage Members" },
  { id: "modify_group", label: "Modify Group Details" },
  { id: "delete_group", label: "Delete Group" },
];

export interface GroupSettingsProps {

}

const GroupSettings = ({
  ...restProps
}: GroupSettingsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Permissions"}</h3>
      </div>

      <div className={styles.content}>
        <Table>
          <Table.Header>
            <tr>
              <Table.Cell sticky="left">{"Who Can"}</Table.Cell>
              {
                roles.map((item, idx) => (
                  <Table.Cell
                    key={item.id}
                    className={classes(idx === 0 && styles.first_role_col, idx === roles.length - 1 && styles.last_role_col, (idx > 0 && idx < roles.length - 1 && styles.mid_role_col))}
                  >
                    {item.label}
                  </Table.Cell>
                ))
              }
            </tr>
          </Table.Header>
          <Table.Body>
            {
              permissions.map(permission => {
                return (
                  <tr key={permission.id}>
                    <Table.Cell<"td"> as="td" sticky="left">
                      {permission.label}
                    </Table.Cell>
                    {
                      roles.map((item, idx) => (
                        <Table.Cell
                          key={item.id}
                          as="td"
                          className={classes(idx === 0 && styles.first_role_col, idx === roles.length - 1 && styles.last_role_col, (idx > 0 && idx < roles.length - 1 && styles.mid_role_col))}
                        >
                          <Checkbox />
                        </Table.Cell>
                      ))
                    }
                  </tr>
                );
              })
            }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default GroupSettings;
