import { FormEvent, ReactNode } from "react";

import { SearchForm } from "@/components/common/forms";
import { Button } from "@/lib/ui/elements/butttons";
import { Drawer } from "@/lib/ui/elements/Drawer";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./AppSearchMobile.module.scss";

export interface AppSearchMobileProps {
  open?: boolean;
  allowAudio?: boolean;
  query?: string;
  onQueryChange?: (value: string) => void;
  onMicClick?: (e: FormEvent<HTMLButtonElement>) => void;
  placeholder?: string;
  children?: ReactNode;
  onClose?: () => void;
}

const AppSearchMobile = ({
  open, onClose,
  query, onQueryChange, placeholder, allowAudio, onMicClick,
  children,
}: AppSearchMobileProps) => {

  return (
    <Drawer
      open={!!open}
      className={styles.app_search}
      overlayClass={styles.overlay}
    >
      <div className={styles.header}>
        <Button
          type="button"
          variant="quaternary"
          className={classes(styles.btn, styles.back_btn)}
          onClick={onClose}
        >
          <ChevronLeftIcon />
        </Button>

        <SearchForm
          query={query}
          onQueryChange={onQueryChange}
          allowAudio={allowAudio}
          placeholder={placeholder}
          onMicClick={onMicClick}
        />
      </div>
      {children}
      <Button
        variant="primary"
        className={styles.floating_close_btn}
        onClick={onClose}
      >
        {"Close"}
        <CrossIcon />
      </Button>
    </Drawer>
  );
};

export default AppSearchMobile;
