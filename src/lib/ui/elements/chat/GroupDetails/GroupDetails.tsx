import { useForm } from "@/lib/hooks/useForm";
import { Button } from "@/lib/ui/elements/butttons";
import { FileInput, FileMeta } from "@/lib/ui/elements/inputs/FileInput";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { TextArea } from "@/lib/ui/elements/inputs/TextArea";
import { Text } from "@/lib/ui/elements/Text";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import DeleteIcon from "@/lib/ui/svgs/icons/DeleteIcon";
import ImageIcon from "@/lib/ui/svgs/icons/ImageIcon";

import styles from "./GroupDetails.module.scss";

const initialValues = {
  name: "",
  profile: [{
    src: "https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnRvb24lMjBwcm9maWxlfGVufDB8fDB8fHww",
  }]
};

export interface GroupDetailsProps {
  onClose?: () => void;
  data?: any;
}

const GroupDetails = ({
  data, onClose,
  ...restProps
}: GroupDetailsProps) => {
  const { values, setFieldValue } = useForm<{
    name: string;
    description?: string;
    guidelines?: string;
    profile?: FileList | FileMeta[];
  }>(
    initialValues,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar_picker}>
        <FileInput
          files={values.profile}
          onInput={e => setFieldValue(["profile"], (e.target as HTMLInputElement).files ?? [])}
          className={styles.file_input}
          placeholder="Browse"
          icon={<ImageIcon />}
        />
        {!!values.profile && (
          <Button
            variant="quaternary"
            className={styles.clear_icon}
            onClick={() => setFieldValue(["profile"], undefined)}
          >
            {values.profile instanceof FileList ? <CrossIcon /> : <DeleteIcon />}
          </Button>
        )}
      </div>

      <InputItem>
        <Text<"label"> as="label">{"Name"}</Text>
        <GeneralInput value={values.name} onInput={e => setFieldValue(["name"], (e.target as HTMLInputElement).value)} />
      </InputItem>

      <InputItem>
        <Text<"label"> as="label">{"Description"}</Text>
        <TextArea value={values.description} onInput={(e => setFieldValue(["description"], (e.target as HTMLTextAreaElement).value))} />
      </InputItem>

      <InputItem>
        <Text<"label"> as="label">{"Guidelines"}</Text>
        <TextArea value={values.guidelines} onInput={e => setFieldValue(["guidelines"], (e.target as HTMLTextAreaElement).value)} />
      </InputItem>

      <div className={styles.controls}>
        <Button
          variant="tertiary"
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
