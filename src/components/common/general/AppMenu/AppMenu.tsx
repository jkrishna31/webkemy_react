import { faro, LogLevel } from "@grafana/faro-web-sdk";

import { useActivePage, useLayoutActions, useModalActions } from "@/data/stores";
import { Button } from "@/lib/ui/elements/butttons";
import { MenuItem } from "@/lib/ui/elements/menu";
import { BarChartIcon, BubbleChartIcon, LineChartIcon, PieChartIcon, RadarChartIcon, ScatterChartIcon } from "@/lib/ui/svgs/charts";
import { AddEmojiIcon } from "@/lib/ui/svgs/emojis";
import { AppLogo, AppNotificationIcon, BellIcon, BlockCodeIcon, CalendarDaysIcon, CalendarPlusIcon, CapsuleIcon, CarouselVerticalIcon, CheckboxIcon, ChevronsRightIcon, ColorPickerIcon, CommentIcon, CompareIcon, CropIcon, CrossIcon, DashboardIcon, EastWestArrowCircleIcon, FileIcon, FilesIcon, FlagIcon2, GlobeIcon, GridIcon, HashtagIcon, HierarchyIcon, InputIcon, KeyframesMultipleIcon, ListCollapseIcon, ListOpenIcon, LoaderIcon, MenuCollapseIcon, MessagesIcon, NotificationRemoveIcon, PanelLeftIcon, PlayIcon, PopoverLeftIcon, RadioButtonIcon, RectangleGogglesIcon, RectangleHorizontalIcon, ScrollIcon2, ShopIcon, SliderIcon, SplitHorizontalIcon, StarIcon, TableIcon, TabsIcon, TagIcon, TextIcon, TextIcon3, ThemeIcon, ToggleSwitchIcon, TreeListIcon, UnorderedListIcon, UserCircleIcon, UserIcon, VolumeHighIcon, WriteIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./AppMenu.module.scss";

export const menuItems = [
    {
        key: "input",
        group: "Input",
        collapsible: false,
        menu: [
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
        key: "media",
        group: "Media",
        collapsible: false,
        menu: [
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
        key: "others",
        group: "Others",
        collapsible: false,
        menu: [
            {
                key: "avatar",
                href: "/components/avatar",
                primary: "Avatar",
                icon: <UserCircleIcon />,
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
                icon: <AppNotificationIcon />,
            },
            {
                key: "button",
                href: "/components/button",
                primary: "Button",
                icon: <CapsuleIcon />,
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
                icon: <NotificationRemoveIcon />,
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
                icon: <ChevronsRightIcon />,
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
                icon: <MessagesIcon />,
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
                icon: <NotificationRemoveIcon />,
            },
            {
                key: "pagination",
                href: "/components/pagination",
                primary: "Pagination",
                icon: <FilesIcon />,
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
                icon: <PopoverLeftIcon />
            },
            {
                key: "table",
                href: "/components/table",
                primary: "Table",
                icon: <TableIcon />,
            },
            {
                key: "data-table",
                href: "/components/data-table",
                primary: "Data Table",
                icon: <TableIcon />,
                disabled: true,
            },
            {
                key: "timeline",
                href: "/components/timeline",
                primary: "Timeline",
                icon: <UnorderedListIcon />,
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
        key: "charts",
        group: "Charts",
        collapsible: false,
        menu: [
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
    {
        key: "templates",
        group: "Templates",
        collapsible: false,
        menu: [
            {
                key: "ecommerce",
                href: "/templates/ecommerce",
                primary: "Ecommerce",
                icon: <ShopIcon />,
                disabled: true,
            },
            {
                key: "messaging",
                href: "/templates/messaging",
                primary: "Messaging",
                icon: <CommentIcon />,
                disabled: true,
            },
            {
                key: "dashboard",
                href: "/templates/dashboard",
                primary: "Dashboard",
                icon: <DashboardIcon />,
                disabled: true,
            },
        ],
    }
]
    .map(menuGroup => ({
        ...menuGroup,
        menu: menuGroup.menu.sort((a, b) => a.key.localeCompare(b.key)),
    }));

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
                className={classes(styles.navmenu_container, styles.flex_vert)}
                inert={open ? undefined : true}
            >
                <div className={styles.top_section}>
                    <AppLogo className={styles.logo_icon} />
                    <div className={styles.top_right}>
                        <Button
                            className={classes(styles.menu_header_ctrl, styles.translate_btn)}
                            icon={
                                <GlobeIcon className={classes(styles.header_ctrl_icon, styles.translate_icon)} />
                            }
                            onClick={handleLangBtnClick}
                            aria-label="Language"
                        />
                        <Button
                            className={classes(styles.menu_header_ctrl, styles.theme_btn)}
                            icon={
                                <ThemeIcon className={classes(styles.header_ctrl_icon, styles.theme_icon)} />
                            }
                            onClick={handleThemeBtnClick}
                            aria-label="Theme"
                        />
                        <Button
                            className={classes(styles.menu_header_ctrl, styles.menu_close_btn)}
                            icon={
                                <CrossIcon className={classes(styles.header_ctrl_icon, styles.close_icon)} />
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
                                <MenuItem
                                    as={item.group ? "button" : "a"}
                                    {...item}
                                    key={item.key}
                                    id={item.key}
                                    activeItem={page}
                                />
                            );
                        })
                    }
                </div>
            </nav>
        </>
    );
};

export default AppMenu;
