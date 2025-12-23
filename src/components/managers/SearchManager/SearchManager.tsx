"use client";

import { AudioListener } from "@/components/common/general";
import { positions } from "@/constants/general.const";
import { useSearchActions, useSearchActive } from "@/data/stores";
import { Modal } from "@/lib/ui/elements/Modal";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import HistoryIcon from "@/lib/ui/svgs/icons/HistoryIcon";

import styles from "./SearchManager.module.scss";

export interface SearchBoxProps {
  overlayClass?: string
  wrapperClass?: string
}

const history = [
  "React 19 new features",
  "chatgpt use cases",
  "Django setup with aws sdk",
  "dynamodb basic concepts",
  "introduction to machine learning",
  "next13"
];

const SearchManager = ({ overlayClass, wrapperClass, ...props }: SearchBoxProps) => {
  const { setSearch } = useSearchActions();
  const active = useSearchActive();
  // const [query, setQuery] = useState("");
  // const [audioMode, setAudioMode] = useState(false);

  const handleClose = () => {
    // setAudioMode(false);
    setSearch("active", undefined);
  };

  const renderSearchHistory = () => {
    return (
      <div className={styles.history_wrapper}>
        <ul className={styles.history_list}>
          {
            history.map((item, idx) => (
              <li className={styles.history_item} key={idx}>
                <HistoryIcon className={styles.history_icon} />
                <span className={styles.query}>{item}</span>
                <button className={styles.delete_btn}>
                  <CrossIcon className={styles.delete_icon} />
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  };

  return active ? (
    <Modal
      overlay pos={positions.TOP_CENTER} onClose={handleClose}
      className={styles.component}
    >
      {active === "audio" ? (
        <AudioListener />
      ) : (
        <>
          {/* <SearchForm
                        formClass={styles.search_form} placeholder="Search..." audio={true}
                        onMicClick={() => setAudioMode(!audioMode)}
                    />
                    {renderSearchHistory()} */}
        </>
      )}
      <div className={styles.float_box}>
        {/* {audioMode ? (
                    <button className={styles.back_btn} onClick={() => setAudioMode(false)}>
                        <ChevronLeftIcon className={styles.back_icon} />
                    </button>
                ) : null} */}
        {/* <kbd className={styles.close_key_hint}>Esc</kbd> */}
        <button className={styles.close_btn} onClick={handleClose}>
          <span className={styles.close_label}>{"Close"}</span>
          <CrossIcon className={styles.close_icon} />
        </button>
      </div>
    </Modal>
  ) : null;
};

export default SearchManager;
