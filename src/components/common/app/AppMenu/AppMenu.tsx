import { LangSelector } from "@/components/common/app/LangSelector";
import { ThemeSelector } from "@/components/common/app/ThemeSelector";
import { useActivePage, useLayoutActions } from "@/data/stores";
import { Button } from "@/lib/components/elements/buttton";
import { Item, ItemGroup } from "@/lib/components/elements/list-item";
import AddEmojiIcon from "@/lib/svgs/icons/AddEmojiIcon";
import AppNotificationIcon from "@/lib/svgs/icons/AppNotificationIcon";
import BarChartIcon from "@/lib/svgs/icons/BarChartIcon";
import BellIcon from "@/lib/svgs/icons/BellIcon";
import BlockCodeIcon from "@/lib/svgs/icons/BlockCodeIcon";
import BubbleChartIcon from "@/lib/svgs/icons/BubbleChartIcon";
import CalendarDaysIcon from "@/lib/svgs/icons/CalendarDaysIcon";
import CalendarPlusIcon from "@/lib/svgs/icons/CalendarPlusIcon";
import CapsuleIcon from "@/lib/svgs/icons/CapsuleIcon";
import CarouselVerticalIcon from "@/lib/svgs/icons/CarouselVerticalIcon";
import CheckboxIcon from "@/lib/svgs/icons/CheckboxIcon";
import ChevronsRightIcon from "@/lib/svgs/icons/ChevronsRightIcon";
import ClockIcon from "@/lib/svgs/icons/ClockIcon";
import ColorPickerIcon from "@/lib/svgs/icons/ColorPickerIcon";
import CommentIcon from "@/lib/svgs/icons/CommentIcon";
import CompareIcon from "@/lib/svgs/icons/CompareIcon";
import ConferenceIcon from "@/lib/svgs/icons/ConferenceIcon";
import CropIcon from "@/lib/svgs/icons/CropIcon";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import DashboardIcon from "@/lib/svgs/icons/DashboardIcon";
import DividerIcon from "@/lib/svgs/icons/DividerIcon";
import DollarIcon from "@/lib/svgs/icons/DollarIcon";
import DynamicGridIcon from "@/lib/svgs/icons/DynamicGridIcon";
import EastWestArrowCircleIcon from "@/lib/svgs/icons/EastWestArrowCircleIcon";
import FileEditIcon from "@/lib/svgs/icons/FileEditIcon";
import FileIcon from "@/lib/svgs/icons/FileIcon";
import FilesIcon from "@/lib/svgs/icons/FilesIcon";
import FlagIcon2 from "@/lib/svgs/icons/FlagIcon2";
import GlobeIcon from "@/lib/svgs/icons/GlobeIcon";
import GridIcon from "@/lib/svgs/icons/GridIcon";
import HashtagIcon from "@/lib/svgs/icons/HashtagIcon";
import HierarchyIcon from "@/lib/svgs/icons/HierarchyIcon";
import InputIcon from "@/lib/svgs/icons/InputIcon";
import InsertImgCenterIcon from "@/lib/svgs/icons/InsertImgCenterIcon";
import KanbanIcon from "@/lib/svgs/icons/KanbanIcon";
import KeyframesMultipleIcon from "@/lib/svgs/icons/KeyframesMultipleIcon";
import LineChartIcon from "@/lib/svgs/icons/LineChartIcon";
import ListCollapseIcon from "@/lib/svgs/icons/ListCollapseIcon";
import ListOpenIcon from "@/lib/svgs/icons/ListOpenIcon";
import LoaderIcon from "@/lib/svgs/icons/LoaderIcon";
import MenuCollapseIcon from "@/lib/svgs/icons/MenuCollapseIcon";
import MessagesIcon from "@/lib/svgs/icons/MessagesIcon";
import NotificationRemoveIcon from "@/lib/svgs/icons/NotificationRemoveIcon";
import PanelLeftIcon from "@/lib/svgs/icons/PanelLeftIcon";
import PanelTopIcon from "@/lib/svgs/icons/PanelTopIcon";
import PasswordInputIcon from "@/lib/svgs/icons/PasswordInputIcon";
import PieChartIcon from "@/lib/svgs/icons/PieChartIcon";
import PlayIcon from "@/lib/svgs/icons/PlayIcon";
import PopoverLeftIcon from "@/lib/svgs/icons/PopoverLeftIcon";
import QuestionIcon from "@/lib/svgs/icons/QuestionIcon";
import QuoteBubbleIcon from "@/lib/svgs/icons/QuoteBubbleIcon";
import RadarChartIcon from "@/lib/svgs/icons/RadarChartIcon";
import RadioButtonIcon from "@/lib/svgs/icons/RadioButtonIcon";
import RectangleGogglesIcon from "@/lib/svgs/icons/RectangleGogglesIcon";
import ScatterChartIcon from "@/lib/svgs/icons/ScatterChartIcon";
import ScrollIcon2 from "@/lib/svgs/icons/ScrollIcon2";
import ShieldKeyholeIcon from "@/lib/svgs/icons/ShieldKeyholeIcon";
import ShopIcon from "@/lib/svgs/icons/ShopIcon";
import SliderIcon from "@/lib/svgs/icons/SliderIcon";
import SplitHorizontalIcon from "@/lib/svgs/icons/SplitHorizontalIcon";
import StarIcon from "@/lib/svgs/icons/StarIcon";
import TableIcon from "@/lib/svgs/icons/TableIcon";
import TabsIcon from "@/lib/svgs/icons/TabsIcon";
import TagIcon from "@/lib/svgs/icons/TagIcon";
import TextBoxIcon from "@/lib/svgs/icons/TextBoxIcon";
import TextIcon from "@/lib/svgs/icons/TextIcon";
import TextIcon3 from "@/lib/svgs/icons/TextIcon3";
import ToggleOnIcon from "@/lib/svgs/icons/ToggleOnIcon";
import TreeListIcon from "@/lib/svgs/icons/TreeListIcon";
import UnorderedListIcon from "@/lib/svgs/icons/UnorderedListIcon";
import UserCircleIcon from "@/lib/svgs/icons/UserCircleIcon";
import VolumeHighIcon from "@/lib/svgs/icons/VolumeHighIcon";
import WriteIcon from "@/lib/svgs/icons/WriteIcon";
import AppLogo from "@/lib/svgs/logos/AppLogo";
import { classes } from "@/lib/utils/style";

import styles from "./AppMenu.module.scss";

export const menuItems = [
    {
        key: "input",
        group: "Inputs",
        collapsible: false,
        menu: [
            {
                key: "input",
                href: "/components/input",
                label: "General Input",
                icon: <InputIcon />,
            },
            {
                key: "checkbox",
                href: "/components/checkbox",
                label: "Checkbox",
                icon: <CheckboxIcon />,
            },
            {
                key: "radio",
                href: "/components/radio",
                label: "Radio",
                icon: <RadioButtonIcon />,
            },
            {
                key: "file-input",
                href: "/components/file-input",
                label: "File Input",
                icon: <FileIcon />,
            },
            {
                key: "password-input",
                href: "/components/password-input",
                label: "Password Input",
                icon: <PasswordInputIcon />,
            },
            // {
            //     key: "otp-input",
            //     href: "/components/otp-input",
            //     label: "OTP Input",
            //     icon: <HashtagIcon />,
            // },
            {
                key: "number-input",
                href: "/components/number-input",
                label: "Number Input",
                icon: <HashtagIcon />,
            },
            {
                key: "select",
                href: "/components/select",
                label: "Select",
                icon: <ListOpenIcon />,
            },
            {
                key: "slider",
                href: "/components/slider",
                label: "Slider",
                icon: <SliderIcon />,
            },
            {
                key: "slider-2d",
                href: "/components/slider-2d",
                label: "Slider 2D",
                icon: <SliderIcon />,
            },
            {
                key: "switch",
                href: "/components/switch",
                label: "Switch",
                icon: <ToggleOnIcon />,
            },
            {
                key: "textarea",
                href: "/components/textarea",
                label: "Textarea",
                icon: <TextBoxIcon />,
            },
            {
                key: "tags-input",
                href: "/components/tags-input",
                label: "Tags Input",
                icon: <TagIcon />,
            },
            {
                key: "input-item",
                href: "/components/input-item",
                label: "Input Item",
                icon: <InsertImgCenterIcon />,
            },
            {
                key: "color-picker",
                href: "/components/color-picker",
                label: "Color Picker",
                icon: <ColorPickerIcon />,
            },
            {
                key: "emoji-picker",
                href: "/components/emoji-picker",
                label: "Emoji Picker",
                icon: <AddEmojiIcon />,
            },
            {
                key: "date-picker",
                href: "/components/date-picker",
                label: "Date Picker",
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
                label: "Audio Player",
                icon: <VolumeHighIcon />,
            },
            {
                key: "video-player",
                href: "/components/video-player",
                label: "Video Player",
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
                label: "Avatar",
                icon: <UserCircleIcon />,
            },
            {
                key: "divider",
                href: "/components/divider",
                label: "Divider",
                icon: <DividerIcon />,
            },
            {
                key: "kanban",
                href: "/components/kanban",
                label: "Kanban",
                icon: <KanbanIcon />,
            },
            {
                key: "dynamic-grid",
                href: "/components/dynamic-grid",
                label: "Dynamic Grid",
                icon: <DynamicGridIcon />,
            },
            {
                key: "text",
                href: "/components/text",
                label: "Text",
                icon: <TextIcon3 />,
            },
            {
                key: "badge",
                href: "/components/badge",
                label: "Badge",
                icon: <AppNotificationIcon />,
            },
            {
                key: "button",
                href: "/components/button",
                label: "Button",
                icon: <CapsuleIcon />,
            },
            {
                key: "chip",
                href: "/components/chip",
                label: "Chip",
                icon: <TagIcon />,
            },
            {
                key: "collapsible",
                href: "/components/collapsible",
                label: "Collapsible",
                icon: <ListCollapseIcon />,
            },
            {
                key: "drawer",
                href: "/components/drawer",
                label: "Drawer",
                icon: <PanelLeftIcon />,
            },
            {
                key: "dropdown",
                href: "/components/dropdown",
                label: "Dropdown",
                icon: <PanelTopIcon />,
            },
            {
                key: "modal",
                href: "/components/modal",
                label: "Modal",
                icon: <NotificationRemoveIcon />,
            },
            {
                key: "scroll-controls",
                href: "/components/scroll-controls",
                label: "Scroll Controls",
                icon: <ScrollIcon2 />,
            },
            {
                key: "loader",
                href: "/components/loader",
                label: "Loader",
                icon: <LoaderIcon />,
            },
            {
                key: "accordion",
                href: "/components/accordion",
                label: "Accordion",
                icon: <ListCollapseIcon />,
            },
            {
                key: "menu",
                href: "/components/menu",
                label: "Menu",
                icon: <MenuCollapseIcon />,
            },
            {
                key: "banner",
                href: "/components/banner",
                label: "Banner",
                icon: <FlagIcon2 />,
            },
            {
                key: "tabs",
                href: "/components/tabs",
                label: "Tabs",
                icon: <TabsIcon />,
            },
            {
                key: "breadcrumb",
                href: "/components/breadcrumb",
                label: "Breadcrumb",
                icon: <ChevronsRightIcon />,
            },
            {
                key: "calendar",
                href: "/components/calendar",
                label: "Calendar",
                icon: <CalendarPlusIcon />,
            },
            {
                key: "carousel",
                href: "/components/carousel",
                label: "Carousel",
                icon: <CarouselVerticalIcon />,
            },
            {
                key: "chat",
                href: "/components/chat",
                label: "Chat",
                icon: <MessagesIcon />,
            },
            {
                key: "comparator",
                href: "/components/comparator",
                label: "Comparator",
                icon: <CompareIcon />,
            },
            {
                key: "image-crop",
                href: "/components/image-crop",
                label: "Image Crop",
                icon: <CropIcon />,
            },
            {
                key: "splitter",
                href: "/components/splitter",
                label: "Splitter",
                icon: <SplitHorizontalIcon />,
            },
            {
                key: "resizable",
                href: "/components/resizable",
                label: "Resizable",
                icon: <EastWestArrowCircleIcon />,
            },
            {
                key: "lightbox",
                href: "/components/lightbox",
                label: "Lightbox",
                icon: <NotificationRemoveIcon />,
            },
            {
                key: "pagination",
                href: "/components/pagination",
                label: "Pagination",
                icon: <FilesIcon />,
            },
            {
                key: "progress",
                href: "/components/progress",
                label: "Progress",
                icon: <LoaderIcon />,
            },
            {
                key: "editor",
                href: "/components/editor",
                label: "Editor",
                icon: <WriteIcon />,
            },
            {
                key: "rate",
                href: "/components/rate",
                label: "Rate",
                icon: <StarIcon />,
            },
            {
                key: "popover",
                href: "/components/popover",
                label: "Popover",
                icon: <PopoverLeftIcon />
            },
            {
                key: "table",
                href: "/components/table",
                label: "Table",
                icon: <TableIcon />,
            },
            // {
            //     key: "data-table",
            //     href: "/components/data-table",
            //     label: "Data Table",
            //     icon: <TableIcon />,
            // },
            {
                key: "timeline",
                href: "/components/timeline",
                label: "Timeline",
                icon: <UnorderedListIcon />,
            },
            {
                key: "virtualizer",
                href: "#",
                label: "Virtualizer",
                icon: <RectangleGogglesIcon />,
                disabled: true,
            },
            {
                key: "framer",
                href: "/components/framer",
                label: "Framer",
                icon: <KeyframesMultipleIcon />,
            },
            {
                key: "code-block",
                href: "/components/code-block",
                label: "Code Block",
                icon: <BlockCodeIcon />,
            },
            {
                key: "toast",
                href: "/components/toast",
                label: "Toast",
                icon: <BellIcon />,
            },
            {
                key: "notification",
                href: "#",
                label: "Notification",
                icon: <BellIcon />,
                disabled: true,
            },
            {
                key: "tree",
                href: "/components/tree",
                label: "Tree",
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
                label: "Line Chart",
                icon: <LineChartIcon />,
            },
            {
                key: "bar-chart",
                href: "/components/bar-chart",
                label: "Bar Chart",
                icon: <BarChartIcon />,
            },
            {
                key: "pie-chart",
                href: "/components/pie-chart",
                label: "Pie Chart",
                icon: <PieChartIcon />,
            },
            {
                key: "scatter-chart",
                href: "/components/scatter-chart",
                label: "Scatter Chart",
                icon: <ScatterChartIcon />,
            },
            {
                key: "packed-circles",
                href: "/components/packed-circles",
                label: "Packed Circles",
                icon: <BubbleChartIcon />,
            },
            {
                key: "heatmap",
                href: "/components/heatmap",
                label: "Heatmap",
                icon: <GridIcon />,
            },
            {
                key: "radar-chart",
                href: "/components/radar-chart",
                label: "Radar Chart",
                disabled: true,
                icon: <RadarChartIcon />,
            },
            {
                key: "geo-chart",
                href: "/components/geo-chart",
                label: "Geo Chart",
                disabled: true,
                icon: <GlobeIcon />,
            },
            {
                key: "hierarchy-chart",
                href: "/components/hierarchy-chart",
                label: "Hierarchy Chart",
                disabled: true,
                icon: <HierarchyIcon />,
            },
        ],
    },
    {
        key: "blocks",
        group: "Blocks",
        collapsible: false,
        menu: [
            {
                key: "auth",
                href: "/components/auth",
                label: "Auth",
                icon: <ShieldKeyholeIcon />,
            },
            {
                key: "pricing-plans",
                href: "/components/pricing-plans",
                label: "Pricing Plans",
                icon: <DollarIcon />,
            },
            {
                key: "testimonials",
                href: "/components/testimonials",
                label: "Testimonials",
                icon: <QuoteBubbleIcon />,
            },
            {
                key: "faqs",
                href: "/components/faqs",
                label: "FAQs",
                icon: <QuestionIcon />,
            },
            {
                key: "comments",
                href: "#",
                label: "Comments",
                icon: <MessagesIcon />,
                disabled: true,
            },
        ]
    },
    {
        key: "widgets",
        group: "Widgets",
        menu: [
            {
                key: "clock",
                href: "/components/clock",
                label: "Clock",
                icon: <ClockIcon />,
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
                label: "Shop",
                icon: <ShopIcon />,
                disabled: true,
            },
            {
                key: "messaging",
                href: "/templates/messaging",
                label: "Messaging",
                icon: <CommentIcon />,
                disabled: true,
            },
            {
                key: "dashboard",
                href: "/templates/dashboard",
                label: "Dashboard",
                icon: <DashboardIcon />,
                disabled: true,
            },
            {
                key: "conference",
                href: "/templates/conference",
                label: "Conference",
                icon: <ConferenceIcon />,
                disabled: true,
            },
            {
                key: "forum",
                href: "/templates/forum",
                label: "Forum",
                icon: <FileEditIcon />,
                disabled: true,
            },
        ],
    },
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
                                            <Item<"a"> as="a" {...item} key={item.key} aria-current={item.key === page} className={styles.menu_item} />
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
