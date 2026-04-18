import { Button } from "@/lib/components/elements/butttons";
import { FileInput, FileMeta } from "@/lib/components/elements/inputs/FileInput";
import { Input } from "@/lib/components/elements/inputs/Input";
import { InputItem } from "@/lib/components/elements/inputs/InputItem";
import { TextArea } from "@/lib/components/elements/inputs/TextArea";
import { Text } from "@/lib/components/elements/text";
import { useForm } from "@/lib/hooks/useForm";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import DeleteIcon from "@/lib/svgs/icons/DeleteIcon";
import ImageIcon from "@/lib/svgs/icons/ImageIcon";

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
    address?: {
      streetAddress?: string;
      zipCode?: number;
    }
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
            variant="muted"
            className={styles.clear_icon}
            onClick={() => setFieldValue(["profile"], undefined)}
          >
            {values.profile instanceof FileList ? <CrossIcon /> : <DeleteIcon />}
          </Button>
        )}
      </div>

      <InputItem>
        <Text<"label"> as="label">{"Name"}</Text>
        <Input value={values.name} onInput={e => setFieldValue(["name"], (e.target as HTMLInputElement).value)} />
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
          variant="muted"
          type="reset"
          onClick={onClose}
        >
          {"Cancel"}
        </Button>
        <Button
          variant="solid"
          type="submit"
        >
          {"Update"}
        </Button>
      </div>
    </div>
  );
};

export default GroupDetails;
