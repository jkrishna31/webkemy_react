"use client";

import Link from "next/link";
import React, { ComponentProps, useState } from "react";

import { SearchForm } from "@/components/common/forms";
import { edges } from "@/constants/general.const";
import { useAppMenu, useLayoutActions, useModalActions, useScrollDir, useSearchActions, useSearchMenu } from "@/data/stores";
import { Avatar } from "@/lib/ui/elements/avatar";
import { Header } from "@/lib/ui/elements/header";
import { AppLogo, CrossIcon, GlobeIcon, HistoryIcon, MenuIcon, SearchIcon, ThemeIcon } from "@/lib/ui/svgs/icons";
import { GithubLogo } from "@/lib/ui/svgs/logos";

import { AppMenu } from "..";
import styles from "./AppHeader.module.scss";

const history = [
    "React 19 new features",
    "chatgpt use cases",
    "Django setup with aws sdk",
    "dynamodb basic concepts",
    "introduction to machine learning",
    "next13",
    "React 19 new features",
    "chatgpt use cases",
    "Django setup with aws sdk",
    "dynamodb basic concepts",
    "introduction to machine learning",
    "next13",
    "React 19 new features",
    "chatgpt use cases",
    "Django setup with aws sdk",
    "dynamodb basic concepts",
    "introduction to machine learning",
    "next13",
    "React 19 new features",
    "chatgpt use cases",
    "Django setup with aws sdk",
    "dynamodb basic concepts",
    "introduction to machine learning",
    "next13",
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
    const { setField: updateModalField } = useModalActions();
    const appMenu = useAppMenu();
    const searchMenu = useSearchMenu();

    const handleMenuBtnClick = () => {
        setLayout("appMenu", !appMenu);
    };

    return (
        <>
            <Header visible={scrollDir === edges.TOP}>
                <div className={styles.wrapper}>
                    <Link href="/" className={styles.logo_container} title="Elselog Home">
                        <AppLogo className={styles.header_app_logo} />
                    </Link>
                    <SearchForm
                        query={query} onQueryChange={setQuery}
                        audio={true}
                        onMicClick={() => {
                            setSearch("active", "audio");
                        }}
                        onClick={() => setLayout("searchMenu", true)}
                        formClass={styles.sf}
                        inputClass={styles.sfi}
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
                            className={`${styles.hr_link} ${styles.search_link}`}
                            title="Search"
                        >
                            <SearchIcon className={styles.header_search_icon} />
                        </Link>
                        <Avatar<"a">
                            as="a"
                            href="https://github.com/jkrishna31/webkemy_react" target="_blank"
                            title="Source Code" aria-label="write"
                            className={styles.source_code}
                        >
                            <GithubLogo className={styles.github_icon} />
                        </Avatar>
                        <button
                            aria-label="change language"
                            className={`${styles.hr_link} ${styles.lang_btn}`}
                            title="Change Language"
                            onClick={() => updateModalField("lang", true)}
                        >
                            <GlobeIcon className={styles.write_icon} />
                        </button>
                        <button
                            aria-label="change theme"
                            className={`${styles.hr_link} ${styles.theme_btn}`}
                            title="Change Theme"
                            onClick={() => updateModalField("theme", true)}
                        >
                            <ThemeIcon className={styles.write_icon} />
                        </button>
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
