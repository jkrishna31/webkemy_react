import { LangSelector } from "@/components/common/general/LangSelector";
import { ThemeSelector } from "@/components/common/general/ThemeSelector";
import { useActivePage, useLayoutActions, useModalActions } from "@/data/stores";
import { Button } from "@/lib/ui/elements/butttons";
import { Item } from "@/lib/ui/elements/Item";
import { ItemGroup } from "@/lib/ui/elements/ItemGroup";
import AddEmojiIcon from "@/lib/ui/svgs/icons/AddEmojiIcon";
import AppLogo from "@/lib/ui/svgs/icons/AppLogo";
import AppNotificationIcon from "@/lib/ui/svgs/icons/AppNotificationIcon";
import BarChartIcon from "@/lib/ui/svgs/icons/BarChartIcon";
import BellIcon from "@/lib/ui/svgs/icons/BellIcon";
import BlockCodeIcon from "@/lib/ui/svgs/icons/BlockCodeIcon";
import BubbleChartIcon from "@/lib/ui/svgs/icons/BubbleChartIcon";
import CalendarDaysIcon from "@/lib/ui/svgs/icons/CalendarDaysIcon";
import CalendarPlusIcon from "@/lib/ui/svgs/icons/CalendarPlusIcon";
import CapsuleIcon from "@/lib/ui/svgs/icons/CapsuleIcon";
import CarouselVerticalIcon from "@/lib/ui/svgs/icons/CarouselVerticalIcon";
import CheckboxIcon from "@/lib/ui/svgs/icons/CheckboxIcon";
import ChevronsRightIcon from "@/lib/ui/svgs/icons/ChevronsRightIcon";
import ColorPickerIcon from "@/lib/ui/svgs/icons/ColorPickerIcon";
import CommentIcon from "@/lib/ui/svgs/icons/CommentIcon";
import CompareIcon from "@/lib/ui/svgs/icons/CompareIcon";
import ConferenceIcon from "@/lib/ui/svgs/icons/ConferenceIcon";
import CropIcon from "@/lib/ui/svgs/icons/CropIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import DashboardIcon from "@/lib/ui/svgs/icons/DashboardIcon";
import DividerIcon from "@/lib/ui/svgs/icons/DividerIcon";
import DynamicGridIcon from "@/lib/ui/svgs/icons/DynamicGridIcon";
import EastWestArrowCircleIcon from "@/lib/ui/svgs/icons/EastWestArrowCircleIcon";
import FileIcon from "@/lib/ui/svgs/icons/FileIcon";
import FilesIcon from "@/lib/ui/svgs/icons/FilesIcon";
import FlagIcon2 from "@/lib/ui/svgs/icons/FlagIcon2";
import GlobeIcon from "@/lib/ui/svgs/icons/GlobeIcon";
import GridIcon from "@/lib/ui/svgs/icons/GridIcon";
import HashtagIcon from "@/lib/ui/svgs/icons/HashtagIcon";
import HierarchyIcon from "@/lib/ui/svgs/icons/HierarchyIcon";
import InputIcon from "@/lib/ui/svgs/icons/InputIcon";
import KanbanIcon from "@/lib/ui/svgs/icons/KanbanIcon";
import KeyframesMultipleIcon from "@/lib/ui/svgs/icons/KeyframesMultipleIcon";
import LineChartIcon from "@/lib/ui/svgs/icons/LineChartIcon";
import ListCollapseIcon from "@/lib/ui/svgs/icons/ListCollapseIcon";
import ListOpenIcon from "@/lib/ui/svgs/icons/ListOpenIcon";
import LoaderIcon from "@/lib/ui/svgs/icons/LoaderIcon";
import MenuCollapseIcon from "@/lib/ui/svgs/icons/MenuCollapseIcon";
import MessagesIcon from "@/lib/ui/svgs/icons/MessagesIcon";
import NotificationRemoveIcon from "@/lib/ui/svgs/icons/NotificationRemoveIcon";
import PanelLeftIcon from "@/lib/ui/svgs/icons/PanelLeftIcon";
import PanelTopIcon from "@/lib/ui/svgs/icons/PanelTopIcon";
import PieChartIcon from "@/lib/ui/svgs/icons/PieChartIcon";
import PlayIcon from "@/lib/ui/svgs/icons/PlayIcon";
import PopoverLeftIcon from "@/lib/ui/svgs/icons/PopoverLeftIcon";
import RadarChartIcon from "@/lib/ui/svgs/icons/RadarChartIcon";
import RadioButtonIcon from "@/lib/ui/svgs/icons/RadioButtonIcon";
import RectangleGogglesIcon from "@/lib/ui/svgs/icons/RectangleGogglesIcon";
import RectangleHorizontalIcon from "@/lib/ui/svgs/icons/RectangleHorizontalIcon";
import ScatterChartIcon from "@/lib/ui/svgs/icons/ScatterChartIcon";
import ScrollIcon2 from "@/lib/ui/svgs/icons/ScrollIcon2";
import ShopIcon from "@/lib/ui/svgs/icons/ShopIcon";
import SliderIcon from "@/lib/ui/svgs/icons/SliderIcon";
import SplitHorizontalIcon from "@/lib/ui/svgs/icons/SplitHorizontalIcon";
import StarIcon from "@/lib/ui/svgs/icons/StarIcon";
import TableIcon from "@/lib/ui/svgs/icons/TableIcon";
import TabsIcon from "@/lib/ui/svgs/icons/TabsIcon";
import TagIcon from "@/lib/ui/svgs/icons/TagIcon";
import TextIcon from "@/lib/ui/svgs/icons/TextIcon";
import TextIcon3 from "@/lib/ui/svgs/icons/TextIcon3";
import ToggleSwitchIcon from "@/lib/ui/svgs/icons/ToggleSwitchIcon";
import TreeListIcon from "@/lib/ui/svgs/icons/TreeListIcon";
import UnorderedListIcon from "@/lib/ui/svgs/icons/UnorderedListIcon";
import UserCircleIcon from "@/lib/ui/svgs/icons/UserCircleIcon";
import VolumeHighIcon from "@/lib/ui/svgs/icons/VolumeHighIcon";
import WriteIcon from "@/lib/ui/svgs/icons/WriteIcon";
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
        key: "general",
        group: "General",
        collapsible: false,
        menu: [
            {
                key: "avatar",
                href: "/components/avatar",
                primary: "Avatar",
                icon: <UserCircleIcon />,
            },
            {
                key: "divider",
                href: "/components/divider",
                primary: "Divider",
                icon: <DividerIcon />,
            },
            {
                key: "kanban",
                href: "/components/kanban",
                primary: "Kanban",
                icon: <KanbanIcon />,
                disabled: true,
            },
            {
                key: "dynamic-grid",
                href: "/components/dynamic-grid",
                primary: "Dynamic Grid",
                icon: <DynamicGridIcon />,
                // disabled: true,
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
                key: "dropdown",
                href: "/components/dropdown",
                primary: "Dropdown",
                icon: <PanelTopIcon />,
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
                key: "tabs",
                href: "/components/tabs",
                primary: "Tabs",
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
                disabled: true,
            },
            {
                key: "code-block",
                href: "/components/code-block",
                primary: "Code Block",
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
                key: "tree",
                href: "/components/tree",
                primary: "Tree",
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
                key: "shop",
                href: "/templates/shop",
                primary: "Shop",
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
            {
                key: "video-call",
                href: "/templates/video-call",
                primary: "Video Call",
                icon: <ConferenceIcon />,
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
    const { setLayout } = useLayoutActions();

    const closeMenu = () => {
        setLayout("appMenu", false);
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
                onClick={e => {
                    if ((e.target as HTMLElement).closest("[href]")) {
                        closeMenu();
                    }
                }}
            >
                <div className={styles.top_section}>
                    <AppLogo className={styles.logo_icon} />
                    <div className={styles.top_right}>
                        <LangSelector className={styles.menu_header_ctrl} />
                        <ThemeSelector className={styles.menu_header_ctrl} />
                        <Button
                            className={styles.menu_header_ctrl}
                            icon={<CrossIcon />}
                            onClick={closeMenu}
                            aria-label="close menu"
                            title="Close Menu"
                        />
                    </div>
                </div>
                <div className={styles.bottom_section}>
                    {
                        menuItems?.map((group) => (
                            <ItemGroup group={group.group} key={group.key}>
                                <div className={styles.list}>
                                    {
                                        group.menu?.map((item) => (
                                            <Item<"a"> as="a" {...item} key={item.key} aria-current={item.key === page} />
                                        ))
                                    }
                                </div>
                            </ItemGroup>
                        ))
                    }
                </div>
            </nav>
        </>
    );
};

export default AppMenu;
