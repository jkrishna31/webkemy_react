"use client";

import Link from "next/link";
import { ComponentProps, useState } from "react";

import { SearchForm } from "@/components/common/forms";
import { edges, SOURCE_CODE } from "@/constants/general.const";
import { useAppMenu, useLayoutActions, useScrollDir, useSearchActions, useSearchMenu } from "@/data/stores";
import { Avatar } from "@/lib/ui/elements/Avatar";
import { Header } from "@/lib/ui/elements/Header";
import AppLogo from "@/lib/ui/svgs/icons/AppLogo";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import HistoryIcon from "@/lib/ui/svgs/icons/HistoryIcon";
import MenuIcon from "@/lib/ui/svgs/icons/MenuIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";
import { GithubLogo } from "@/lib/ui/svgs/logos";
import { classes } from "@/lib/utils/style.utils";

import { AppMenu, LangSelector, ThemeSelector } from "..";
import styles from "./AppHeader.module.scss";

const history = [
    "lorem ipsum dolor sit amet",
    "adipisci assumenda animi",
    "corrupti vitae",
    "dynamodb basic concepts",
    "magnam distinctio corrupti vitae",
    "similique nesciunt",
];

export interface AppHeaderProps extends ComponentProps<"div"> {

}

const AppHeader = ({
    ...props
}: AppHeaderProps) => {
    const [query, setQuery] = useState("");

    const scrollDir = useScrollDir();
    const { setSearch } = useSearchActions();
    const { setLayout } = useLayoutActions();
    const appMenu = useAppMenu();
    const searchMenu = useSearchMenu();

    const handleMenuBtnClick = () => {
        setLayout("appMenu", !appMenu);
    };

    return (
        <>
            <Header visible={scrollDir === edges.TOP} className={styles.header}>
                <div className={styles.wrapper}>
                    <Link href="/" className={styles.logo_container} title="Elselog Home" aria-label="App Logo (Webkemy)">
                        <AppLogo className={styles.header_app_logo} />
                    </Link>
                    <SearchForm
                        query={query}
                        onQueryChange={setQuery}
                        audio
                        onMicClick={() => setSearch("active", "audio")}
                        onClick={() => setLayout("searchMenu", true)}
                        onClose={() => setLayout("searchMenu", false)}
                        formClass={styles.search_form}
                        searchDd={
                            searchMenu ? (
                                <ul>
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
                            ) : null
                        }
                    />
                    <div className={styles.hrc}>
                        <Link
                            aria-label="search"
                            href="#"
                            className={classes(styles.hr_link, styles.search_link)}
                            title="Search"
                        >
                            <SearchIcon className={styles.header_search_icon} />
                        </Link>
                        <Avatar<"a">
                            as="a"
                            href={SOURCE_CODE} target="_blank"
                            title="Source Code" aria-label="write"
                            className={styles.source_code}
                        >
                            <GithubLogo className={styles.github_icon} />
                        </Avatar>
                        <ThemeSelector className={classes(styles.hr_link, styles.theme_btn)} />
                        <LangSelector className={classes(styles.hr_link, styles.lang_btn)} />
                        <button
                            className={styles.menu_btn}
                            aria-expanded={appMenu} aria-controls="navigation-drawer" aria-label="open menu"
                            title="Open Menu"
                            onClick={() => handleMenuBtnClick()}
                        >
                            <MenuIcon className={styles.menu_icon} />
                        </button>
                    </div>
                </div>
            </Header>
            <AppMenu open={appMenu} />
        </>
    );
};

export default AppHeader;
