"use client";

import { ComponentProps, useState } from "react";

import { Badge } from "@/lib/ui/elements/Badge";
import { Button } from "@/lib/ui/elements/butttons";
import { Checkbox } from "@/lib/ui/elements/inputs/Checkbox";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { Text } from "@/lib/ui/elements/Text";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import DownArrowIcon from "@/lib/ui/svgs/icons/DownArrowIcon";
import GearIcon from "@/lib/ui/svgs/icons/GearIcon";
import LetterCaseIcon from "@/lib/ui/svgs/icons/LetterCaseIcon";
import LetterCaseToggleIcon from "@/lib/ui/svgs/icons/LetterCaseToggleIcon";
import RegExpIcon from "@/lib/ui/svgs/icons/RegExpIcon";
import UpArrowIcon from "@/lib/ui/svgs/icons/UpArrowIcon";
import WholeWordIcon from "@/lib/ui/svgs/icons/WholeWordIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./FindReplace.module.scss";

export interface FindReplaceProps extends ComponentProps<"div"> {
  onClose?: () => void;
}

const FindReplace = ({
  onClose,
  className,
  ...restProps
}: FindReplaceProps) => {
  const [showReplace, setShowReplace] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [regExp, setRegExp] = useState(false);
  const [matchWholeWord, setMatchWholeWord] = useState(false);
  const [matchDiacritics, setMatchDiacritics] = useState(false);
  const [preserveCase, setPreserveCase] = useState(false);

  const [search, setSearch] = useState("");
  const [replaceWith, setReplaceWith] = useState("");

  const appliedFiltersCount = [caseSensitive, regExp, matchWholeWord, matchDiacritics].filter(Boolean).length;

  return (
    <div className={classes(styles.wrapper, className)}>
      <div className={styles.row}>
        <InputFieldWrapper>
          <GeneralInput
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="quaternary"
            className={classes(styles.toggle_btn, styles.ctrl_btn)}
            title="Case sensitive"
            aria-label="Case sensitive"
            aria-pressed={!!appliedFiltersCount}
            onClick={() => setShowFilters(!showFilters)}
            style={{ position: "relative" }}
          // aria-pressed={caseSensitive}
          // onClick={() => setCaseSensitive(!caseSensitive)}
          >
            {/* <LetterCaseIcon /> */}
            <GearIcon />
            {!!appliedFiltersCount && <Badge color="red">{appliedFiltersCount}</Badge>}
          </Button>
          {/* <Button
            variant="quaternary"
            className={classes(styles.toggle_btn, styles.ctrl_btn)}
            title="Match whole word only"
            aria-label="Match whole word only"
            aria-pressed={matchWholeWord}
            onClick={() => setMatchWholeWord(!matchWholeWord)}
          >
            <WholeWordIcon />
          </Button> */}
          {/* <Button
            variant="quaternary"
            className={classes(styles.toggle_btn, styles.ctrl_btn)}
            title="Regular expression"
            aria-label="Regular expression"
            aria-pressed={regExp}
            onClick={() => setRegExp(!regExp)}
          >
            <RegExpIcon />
          </Button> */}
          <Button
            variant="quaternary"
            className={classes(styles.toggle_btn, styles.controls_toggle_btn)}
            aria-label="Show Controls"
            aria-pressed={showReplace}
            onClick={() => setShowReplace(!showReplace)}
          >
            <ChevronLeftIcon />
          </Button>
        </InputFieldWrapper>
      </div>
      {!!showFilters && (
        <div className={styles.filters}>
          <Text<"label"> as="label" inline>
            <Checkbox checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} />
            {"Case sensitive"}
          </Text>
          <Text<"label"> as="label" inline>
            <Checkbox checked={matchWholeWord} onChange={e => setMatchWholeWord(e.target.checked)} />
            {"Match whole word only"}
          </Text>
          <Text<"label"> as="label" inline>
            <Checkbox checked={regExp} onChange={e => setRegExp(e.target.checked)} />
            {"Regular expressions"}
          </Text>
          <Text<"label"> as="label" inline>
            <Checkbox checked={matchDiacritics} onChange={e => setMatchDiacritics(e.target.checked)} />
            {"Match diacritics"}
          </Text>
        </div>
      )}
      {!!showReplace && (
        <div className={styles.controls_panel}>
          <div className={styles.row}>
            <InputFieldWrapper>
              <GeneralInput
                placeholder="Replace With"
                value={replaceWith}
                onChange={(e) => setReplaceWith(e.target.value)}
              />
              <Button
                variant="quaternary"
                className={classes(styles.toggle_btn, styles.preserve_case_btn)}
                title="Preserve case"
                aria-label="Preserve case"
                aria-pressed={preserveCase}
                onClick={() => setPreserveCase(!preserveCase)}
              >
                <LetterCaseToggleIcon />
              </Button>
            </InputFieldWrapper>
            {!!replaceWith.length && (
              <div className={styles.split_btns}>
                <Button
                  variant="tertiary"
                  className={styles.replace_btn}
                >
                  {"Replace"}
                </Button>
                <Button
                  variant="tertiary"
                  className={styles.replace_all_btn}
                >
                  {"All"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={classes(styles.row, styles.action_row)}>
        <p className={styles.match_status}><span>{0}</span>{"/"}{0}{" matches"}</p>
        <div className={styles.split_btns}>
          <Button
            variant="tertiary"
            className={classes(styles.nav_btn, styles.prev_btn)}
            aria-label="Previous match"
            title="Previous Match"
          // disabled
          >
            <UpArrowIcon />
            {/* {"Prev"} */}
          </Button>
          <Button
            variant="tertiary"
            className={classes(styles.nav_btn, styles.next_btn)}
            aria-label="Next match"
            title="Next Match"
          // disabled
          >
            <DownArrowIcon />
            {/* {"Next"} */}
          </Button>
        </div>
        {!!onClose && (
          <Button variant="quaternary" className={styles.close_btn} onClick={onClose}>
            <CrossIcon />
          </Button>
        )}
      </div>
      {/* todo: include/exclude */}
    </div>
  );
};

export default FindReplace;
