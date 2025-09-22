import { faro, LogLevel } from "@grafana/faro-web-sdk";

import { useActivePage, useLayoutActions, useModalActions } from "@/data/stores";
import { Button } from "@/lib/ui/elements/butttons";
import { MenuGroup, MenuItem } from "@/lib/ui/elements/menu";
import { AppLogo, CrossIcon, GlobeIcon, ThemeIcon } from "@/lib/ui/svgs/icons";

import styles from "./AppMenu.module.scss";

export const menuItems = [
    {
        group: "General",
        children: [
            {
                key: "avatar",
                href: "/components/avatar",
                primary: "Avatar",
            },
            {
                key: "text",
                href: "/components/text",
                primary: "Text",
            },
            {
                key: "badge",
                href: "/components/badge",
                primary: "Badge",
            },
            {
                key: "button",
                href: "/components/button",
                primary: "Button",
            },
            {
                key: "chip",
                href: "/components/chip",
                primary: "Chip",
            },
            {
                key: "collapsible",
                href: "/components/collapsible",
                primary: "Collapsible",
            },
            {
                key: "drawer",
                href: "/components/drawer",
                primary: "Drawer",
            },
            {
                key: "modal",
                href: "/components/modal",
                primary: "Modal",
            },
            {
                key: "scroll-controls",
                href: "/components/scroll-controls",
                primary: "Scroll Controls",
            },
            {
                key: "loader",
                href: "/components/loader",
                primary: "Loader",
            },
        ],
    },
    {
        group: "Input",
        children: [
            {
                key: "input",
                href: "/components/input",
                primary: "General Input",
            },
            {
                key: "checkbox",
                href: "/components/checkbox",
                primary: "Checkbox",
            },
            {
                key: "radio",
                href: "/components/radio",
                primary: "Radio",
            },
            {
                key: "file-input",
                href: "/components/file-input",
                primary: "File Input",
            },
            {
                key: "number-input",
                href: "/components/number-input",
                primary: "Number Input",
            },
            {
                key: "select",
                href: "/components/select",
                primary: "Select",
            },
            {
                key: "slider",
                href: "/components/slider",
                primary: "Slider",
            },
            {
                key: "slider-2d",
                href: "/components/slider-2d",
                primary: "Slider 2D",
            },
            {
                key: "switch",
                href: "/components/switch",
                primary: "Switch",
            },
            {
                key: "textarea",
                href: "/components/textarea",
                primary: "Textarea",
            },
            {
                key: "tags-input",
                href: "/components/tags-input",
                primary: "Tags Input",
            },
            {
                key: "input-item",
                href: "/components/input-item",
                primary: "Input Item",
            },
            {
                key: "color-picker",
                href: "/components/color-picker",
                primary: "Color Picker",
            },
            {
                key: "emoji-picker",
                href: "/components/emoji-picker",
                primary: "Emoji Picker",
            },
            {
                key: "date-picker",
                href: "/components/date-picker",
                primary: "Date Picker",
                disabled: true,
            },
        ],
    },
    {
        group: "Media",
        children: [
            {
                key: "audio-player",
                href: "/components/audio-player",
                primary: "Audio Player",
            },
            {
                key: "video-player",
                href: "/components/video-player",
                primary: "Video Player",
            },
        ],
    },
    {
        group: "Others",
        children: [
            {
                key: "accordion",
                href: "/components/accordion",
                primary: "Accordion",
            },
            {
                key: "banner",
                href: "/components/banner",
                primary: "Banner",
            },
            {
                key: "tablist",
                href: "/components/tablist",
                primary: "Tablist",
            },
            {
                key: "breadcrumb",
                href: "/components/breadcrumb",
                primary: "Breadcrumb",
            },
            {
                key: "calendar",
                href: "/components/calendar",
                primary: "Calendar",
            },
            {
                key: "carousel",
                href: "/components/carousel",
                primary: "Carousel",
            },
            {
                key: "chatbot",
                href: "/components/chatbot",
                primary: "Chatbot",
            },
            {
                key: "comparator",
                href: "/components/comparator",
                primary: "Comparator",
                disabled: true,
            },
            {
                key: "crop",
                href: "/components/crop",
                primary: "Crop",
                disabled: true,
            },
            {
                key: "lightbox",
                href: "/components/lightbox",
                primary: "Lightbox",
            },
            {
                key: "pagination",
                href: "/components/pagination",
                primary: "Pagination",
            },
            {
                key: "progress",
                href: "/components/progress",
                primary: "Progress",
            },
            {
                key: "editor",
                href: "/components/editor",
                primary: "Editor",
                disabled: true,
            },
            {
                key: "rate",
                href: "/components/rate",
                primary: "Rate",
            },
            {
                key: "popper",
                href: "/components/popper",
                primary: "Popper",
                disabled: true,
            },
            {
                key: "table",
                href: "/components/table",
                primary: "Table",
            },
            {
                key: "timeline",
                href: "/components/timeline",
                primary: "Timeline",
            },
            {
                key: "virtualizer",
                href: "/components/virtualizer",
                primary: "Virtualizer",
                disabled: true,
            },
            {
                key: "code-view",
                href: "/components/code-view",
                primary: "Code View",
            },
            {
                key: "toast",
                href: "/components/toast",
                primary: "Toast",
            },
            {
                key: "notification",
                href: "/components/notification",
                primary: "Notification",
                disabled: true,
            },
            {
                key: "tree-view",
                href: "/components/tree-view",
                primary: "Tree View",
            },
        ],
    },
    {
        group: "Charts",
        children: [
            {
                key: "line-chart",
                href: "/components/line-chart",
                primary: "Line Chart",
            },
            {
                key: "bar-chart",
                href: "/components/bar-chart",
                primary: "Bar Chart",
            },
            {
                key: "pie-chart",
                href: "/components/pie-chart",
                primary: "Pie Chart",
            },
            {
                key: "scatter-chart",
                href: "/components/scatter-chart",
                primary: "Scatter Chart",
            },
            {
                key: "packed-circles",
                href: "/components/packed-circles",
                primary: "Packed Circles",
            },
            {
                key: "heatmap",
                href: "/components/heatmap",
                primary: "Heatmap",
            },
            {
                key: "radar-chart",
                href: "/components/radar-chart",
                primary: "Radar Chart",
                disabled: true,
            },
            {
                key: "geo-chart",
                href: "/components/geo-chart",
                primary: "Geo Chart",
                disabled: true,
            },
        ],
    },
];

export interface AppMenuProps {
    open: boolean
}

const AppMenu = ({ open }: AppMenuProps) => {
    const page = useActivePage();
    const { updateStore: updateModalStore } = useModalActions();
    const { setLayout } = useLayoutActions();

    const closeMenu = () => {
        setLayout("appMenu", false);
    };

    const handleThemeBtnClick = () => {
        closeMenu();
        updateModalStore("theme", true);
        faro.api?.pushLog(
            ["Theme popup opened"],
            {
                level: LogLevel.LOG,
                context: {
                    desc: "Theme Popup Opened"
                }
            }
        );
    };

    const handleLangBtnClick = () => {
        closeMenu();
        updateModalStore("lang", true);
    };

    return (
        <>
            <div
                id={styles.navmenu_overlay}
                onClick={closeMenu}
                inert={open ? undefined : true}
            >
            </div>
            <nav
                id="navigation-drawer"
                className={`${styles.navmenu_container} ${styles.flex_vert}`}
                inert={open ? undefined : true}
            >
                <div className={styles.top_section}>
                    <AppLogo className={styles.logo_icon} />
                    <div className={styles.top_right}>
                        <Button
                            className={`${styles.menu_header_ctrl} ${styles.translate_btn}`}
                            icon={
                                <GlobeIcon className={`${styles.header_ctrl_icon} ${styles.translate_icon}`} />
                            }
                            onClick={handleLangBtnClick}
                            aria-label="Language"
                        />
                        <Button
                            className={`${styles.menu_header_ctrl} ${styles.theme_btn}`}
                            icon={
                                <ThemeIcon className={`${styles.header_ctrl_icon} ${styles.theme_icon}`} />
                            }
                            onClick={handleThemeBtnClick}
                            aria-label="Theme"
                        />
                        <Button
                            className={`${styles.menu_header_ctrl} ${styles.menu_close_btn}`}
                            icon={
                                <CrossIcon className={`${styles.header_ctrl_icon} ${styles.close_icon}`} />
                            }
                            onClick={closeMenu}
                            aria-label="close menu"
                            title="Close Menu"
                        />
                    </div>
                </div>
                <div className={styles.bottom_section}>
                    {
                        menuItems.map((item: any) => {
                            return (
                                <MenuGroup
                                    key={item.group} title={item.group}
                                >
                                    {
                                        item.children?.map((menuItem: any) => {
                                            return (
                                                <MenuItem<"a">
                                                    as="a"
                                                    key={menuItem.key}
                                                    active={page === menuItem.key}
                                                    href={menuItem.href}
                                                    primary={menuItem.primary}
                                                    disabled={menuItem.disabled}
                                                />
                                            );
                                        })
                                    }
                                </MenuGroup>
                            );
                        })
                    }
                </div>
            </nav>
        </>
    );
};

export default AppMenu;
