import { faro, LogLevel } from "@grafana/faro-web-sdk";

import { useActivePage, useLayoutActions, useModalActions } from "@/data/stores";
import { Button } from "@/lib/ui/elements/butttons";
import { MenuGroup, MenuItem } from "@/lib/ui/elements/menu";
import { BarChartIcon, BubbleChartIcon, LineChartIcon, PieChartIcon, RadarChartIcon, ScatterChartIcon } from "@/lib/ui/svgs/charts";
import { AddEmojiIcon } from "@/lib/ui/svgs/emojis";
import { AppLogo, BellIcon, BlockCodeIcon, ButtonIcon, CalendarDaysIcon, CalendarPlusIcon, CarouselVerticalIcon, CheckboxIcon, ColorPickerIcon, CommentIcon, CompareIcon, CropIcon, CrossIcon, EastWestArrowCircleIcon, FileIcon, FlagIcon2, GlobeIcon, GridIcon, HashtagIcon, HierarchyIcon, InputIcon, KeyframesMultipleIcon, ListCollapseIcon, ListOpenIcon, LoaderIcon, MenuCollapseIcon, PanelLeftIcon, PlayIcon, PopoverLeftIcon, RadioButtonIcon, RectangleGogglesIcon, RectangleHorizontalIcon, ScrollIcon2, SliderIcon, SplitHorizontalIcon, StarIcon, TableIcon, TabsIcon, TagIcon, TextIcon, TextIcon3, ThemeIcon, ToggleSwitchIcon, TreeListIcon, UserIcon, VerifiedBadgeIcon, VolumeHighIcon, WriteIcon } from "@/lib/ui/svgs/icons";

import styles from "./AppMenu.module.scss";

export const menuItems = [
    {
        group: "Input",
        children: [
            {
                key: "input",
                href: "/components/input",
                primary: "General Input",
                icon: <InputIcon />,
            },
            {
                key: "checkbox",
                href: "/components/checkbox",
                primary: "Checkbox",
                icon: <CheckboxIcon />,
            },
            {
                key: "radio",
                href: "/components/radio",
                primary: "Radio",
                icon: <RadioButtonIcon />,
            },
            {
                key: "file-input",
                href: "/components/file-input",
                primary: "File Input",
                icon: <FileIcon />,
            },
            {
                key: "number-input",
                href: "/components/number-input",
                primary: "Number Input",
                icon: <HashtagIcon />,
            },
            {
                key: "select",
                href: "/components/select",
                primary: "Select",
                icon: <ListOpenIcon />,
            },
            {
                key: "slider",
                href: "/components/slider",
                primary: "Slider",
                icon: <SliderIcon />,
            },
            {
                key: "slider-2d",
                href: "/components/slider-2d",
                primary: "Slider 2D",
                icon: <SliderIcon />,
            },
            {
                key: "switch",
                href: "/components/switch",
                primary: "Switch",
                icon: <ToggleSwitchIcon />,
            },
            {
                key: "textarea",
                href: "/components/textarea",
                primary: "Textarea",
                icon: <TextIcon />,
            },
            {
                key: "tags-input",
                href: "/components/tags-input",
                primary: "Tags Input",
                icon: <TagIcon />,
            },
            {
                key: "input-item",
                href: "/components/input-item",
                primary: "Input Item",
                icon: <RectangleHorizontalIcon />,
            },
            {
                key: "color-picker",
                href: "/components/color-picker",
                primary: "Color Picker",
                icon: <ColorPickerIcon />,
            },
            {
                key: "emoji-picker",
                href: "/components/emoji-picker",
                primary: "Emoji Picker",
                icon: <AddEmojiIcon />,
            },
            {
                key: "date-picker",
                href: "/components/date-picker",
                primary: "Date Picker",
                icon: <CalendarDaysIcon />,
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
                icon: <VolumeHighIcon />,
            },
            {
                key: "video-player",
                href: "/components/video-player",
                primary: "Video Player",
                icon: <PlayIcon />,
            },
        ],
    },
    {
        group: "Others",
        children: [
            {
                key: "avatar",
                href: "/components/avatar",
                primary: "Avatar",
                icon: <UserIcon />,
            },
            {
                key: "text",
                href: "/components/text",
                primary: "Text",
                icon: <TextIcon3 />,
            },
            {
                key: "badge",
                href: "/components/badge",
                primary: "Badge",
                icon: <VerifiedBadgeIcon />,
            },
            {
                key: "button",
                href: "/components/button",
                primary: "Button",
                icon: <ButtonIcon />,
            },
            {
                key: "chip",
                href: "/components/chip",
                primary: "Chip",
                icon: <TagIcon />,
            },
            {
                key: "collapsible",
                href: "/components/collapsible",
                primary: "Collapsible",
                icon: <ListCollapseIcon />,
            },
            {
                key: "drawer",
                href: "/components/drawer",
                primary: "Drawer",
                icon: <PanelLeftIcon />,
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
                icon: <ScrollIcon2 />,
            },
            {
                key: "loader",
                href: "/components/loader",
                primary: "Loader",
                icon: <LoaderIcon />,
            },
            {
                key: "accordion",
                href: "/components/accordion",
                primary: "Accordion",
                icon: <ListCollapseIcon />,
            },
            {
                key: "menu",
                href: "/components/menu",
                primary: "Menu",
                icon: <MenuCollapseIcon />,
            },
            {
                key: "banner",
                href: "/components/banner",
                primary: "Banner",
                icon: <FlagIcon2 />,
            },
            {
                key: "tablist",
                href: "/components/tablist",
                primary: "Tablist",
                icon: <TabsIcon />,
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
                icon: <CalendarPlusIcon />,
            },
            {
                key: "carousel",
                href: "/components/carousel",
                primary: "Carousel",
                icon: <CarouselVerticalIcon />,
            },
            {
                key: "chatbot",
                href: "/components/chatbot",
                primary: "Chatbot",
                icon: <CommentIcon />,
            },
            {
                key: "comparator",
                href: "/components/comparator",
                primary: "Comparator",
                disabled: true,
                icon: <CompareIcon />,
            },
            {
                key: "image-crop",
                href: "/components/image-crop",
                primary: "Image Crop",
                icon: <CropIcon />,
            },
            {
                key: "splitter",
                href: "/components/splitter",
                primary: "Splitter",
                icon: <SplitHorizontalIcon />,
            },
            {
                key: "resizable",
                href: "/components/resizable",
                primary: "Resizable",
                icon: <EastWestArrowCircleIcon />,
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
                icon: <LoaderIcon />,
            },
            {
                key: "editor",
                href: "/components/editor",
                primary: "Editor",
                disabled: true,
                icon: <WriteIcon />,
            },
            {
                key: "rate",
                href: "/components/rate",
                primary: "Rate",
                icon: <StarIcon />,
            },
            {
                key: "popover",
                href: "/components/popover",
                primary: "Popover",
                disabled: true,
                icon: <PopoverLeftIcon />
            },
            {
                key: "table",
                href: "/components/table",
                primary: "Table",
                icon: <TableIcon />,
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
                icon: <RectangleGogglesIcon />,
            },
            {
                key: "framer",
                href: "/components/framer",
                primary: "Framer",
                disabled: true,
                icon: <KeyframesMultipleIcon />,
            },
            {
                key: "code-view",
                href: "/components/code-view",
                primary: "Code View",
                icon: <BlockCodeIcon />,
            },
            {
                key: "toast",
                href: "/components/toast",
                primary: "Toast",
                icon: <BellIcon />,
            },
            {
                key: "notification",
                href: "/components/notification",
                primary: "Notification",
                disabled: true,
                icon: <BellIcon />,
            },
            {
                key: "tree-view",
                href: "/components/tree-view",
                primary: "Tree View",
                icon: <TreeListIcon />,
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
                icon: <LineChartIcon />,
            },
            {
                key: "bar-chart",
                href: "/components/bar-chart",
                primary: "Bar Chart",
                icon: <BarChartIcon />,
            },
            {
                key: "pie-chart",
                href: "/components/pie-chart",
                primary: "Pie Chart",
                icon: <PieChartIcon />,
            },
            {
                key: "scatter-chart",
                href: "/components/scatter-chart",
                primary: "Scatter Chart",
                icon: <ScatterChartIcon />,
            },
            {
                key: "packed-circles",
                href: "/components/packed-circles",
                primary: "Packed Circles",
                icon: <BubbleChartIcon />,
            },
            {
                key: "heatmap",
                href: "/components/heatmap",
                primary: "Heatmap",
                icon: <GridIcon />,
            },
            {
                key: "radar-chart",
                href: "/components/radar-chart",
                primary: "Radar Chart",
                disabled: true,
                icon: <RadarChartIcon />,
            },
            {
                key: "geo-chart",
                href: "/components/geo-chart",
                primary: "Geo Chart",
                disabled: true,
                icon: <GlobeIcon />,
            },
            {
                key: "hierarchy-chart",
                href: "/components/hierarchy-chart",
                primary: "Hierarchy Chart",
                disabled: true,
                icon: <HierarchyIcon />,
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
                                                    id={menuItem.key}
                                                    activeItem={page}
                                                    href={menuItem.href}
                                                    primary={menuItem.primary}
                                                    icon={menuItem.icon}
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
