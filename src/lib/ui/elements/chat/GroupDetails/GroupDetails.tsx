import { Button } from "@/lib/ui/elements/butttons";
import { FileInput } from "@/lib/ui/elements/inputs/FileInput";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { TextArea } from "@/lib/ui/elements/inputs/TextArea";
import { Text } from "@/lib/ui/elements/Text";

import styles from "./GroupDetails.module.scss";

export interface GroupDetailsProps {
  onClose?: () => void;
}

const GroupDetails = ({
  onClose,
  ...restProps
}: GroupDetailsProps) => {
  return (
    <div className={styles.wrapper}>
      <FileInput files={null} />

      <InputItem>
        <Text<"label"> as="label">{"Name"}</Text>
        <GeneralInput />
      </InputItem>

      <InputItem>
        <Text<"label"> as="label">{"Description"}</Text>
        <TextArea />
      </InputItem>

      <InputItem>
        <Text<"label"> as="label">{"Guidelines"}</Text>
        <TextArea />
      </InputItem>

      <div className={styles.controls}>
        <Button
          variant="secondary"
          type="reset"
          onClick={onClose}
        >
          {"Cancel"}
        </Button>
        <Button
          variant="primary"
          type="submit"
        >
          {"Update"}
        </Button>
      </div>
    </div>
  );
};

export default GroupDetails;
