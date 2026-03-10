import Image from "next/image";

import { SearchForm } from "@/components/common/forms";
import { Avatar } from "@/lib/ui/elements/Avatar";
import { Button } from "@/lib/ui/elements/butttons";
import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Table } from "@/lib/ui/elements/Table";
import CopyIcon from "@/lib/ui/svgs/icons/CopyIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import PlusIcon from "@/lib/ui/svgs/icons/PlusIcon";

import styles from "./MembersPanel.module.scss";

const roleLabels = {
  admin: "Admin",
  member: "Member",
} as const;

const dummyMembers = [
  {
    id: "1", name: "John Snow", email: "lopez_tk88@outlook.com", role: "admin",
    profile: "https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnRvb24lMjBwcm9maWxlfGVufDB8fDB8fHww",
  },
  {
    id: "2", name: "Julio Vincent Gambuto", email: "lucy.g22@yahoo.com", role: "member",
    profile: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "3", name: "Ethan Brooks", email: "liam.baker@example.com", role: "member",
    profile: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "4", name: "Amelia Green", email: "isabella.ward@example.com", role: "member",
    profile: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "5", name: "Michael", email: "c.rivera84@gmail.com", role: "member",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop",
  },
  {
    id: "6", name: "Leo Gonzalez", email: "noah.mitchell@example.com", role: "member",
    profile: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1631&auto=format&fit=crop",
  },
  {
    id: "7", name: "Emma Hill", email: "sophia_p29@icloud.com", role: "member",
    profile: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=687&auto=format&fit=crop",
  },

  {
    id: "8", name: "Lela Glover", email: "lelaglover46@aol.com", role: "member",
    profile: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "9", name: "Carlos Rivera", email: "c.rivera84@gmail.com", role: "member",
    profile: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop",
  },
  {
    id: "10", name: "Sophia Patel", email: "sophia_p29@icloud.com", role: "member",
    profile: "https://images.unsplash.com/photo-1623184663796-f0eb7e46d6ab?q=80&w=1112&auto=format&fit=crop",
  },
  {
    id: "11", name: "Henry Thompson", email: "hthompson52@comcast.net", role: "member",
    profile: "https://images.unsplash.com/flagged/photo-1573603867003-89f5fd7a7576?q=80&w=746&auto=format&fit=crop",
  },
  {
    id: "12", name: "Mia Chen", email: "miac_041@gmail.com", role: "member",
    profile: "https://images.unsplash.com/photo-1718391963402-e2011890093f?q=80&w=687&auto=format&fit=crop",
  },
];

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
        <Button variant="primary" className={styles.add_btn}>
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
                    <Avatar className={styles.profile}>
                      <Image src={item.profile} alt={item.name} width={34} height={34} />
                    </Avatar>
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
                        <Item scope="list" primary="Admin" selected={item.role === "admin"} />
                        <Item scope="list" primary="Member" selected={item.role === "member"} />
                      </ItemList>
                    }
                  >
                    {(roleLabels as any)[item.role]}
                  </Dropdown>
                </Table.Cell>
                <Table.Cell<"td"> as="td" sticky="right" className={styles.last_col}>
                  <Button variant="quaternary" className={styles.action_btn}>
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
