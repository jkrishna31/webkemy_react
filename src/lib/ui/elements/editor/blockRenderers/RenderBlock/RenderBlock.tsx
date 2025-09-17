import { editorBlocks } from "@/constants/editor.const";

import { RenderBox, RenderCode, RenderCollapsible, RenderDivider, RenderEmbed, RenderHeading, RenderImage, RenderList, RenderPara, RenderSubheading, RenderTable } from "..";

const RenderBlock = ({ data, ...props }: any) => {
    switch (data.type) {
        case editorBlocks.HEADING:
            return <RenderHeading block={data} {...props} />;
        case editorBlocks.SUB_HEADING:
            return <RenderSubheading block={data} {...props} />;
        case editorBlocks.PARA:
            return <RenderPara block={data} {...props} />;
        case editorBlocks.CODE:
            return <RenderCode block={data} {...props} />;
        case editorBlocks.TIP:
        case editorBlocks.NOTE:
        case editorBlocks.QUOTE:
        case editorBlocks.CAUTION:
            return <RenderBox block={data} {...props} />;
        case editorBlocks.DIVIDER:
            return <RenderDivider block={data} {...props} />;
        case editorBlocks.IMAGE:
            return <RenderImage block={data} {...props} />;
        case editorBlocks.YOUTUBE:
        case editorBlocks.GITHUB:
        case editorBlocks.CODEPEN:
        case editorBlocks.CODESANDBOX:
            return <RenderEmbed block={data} {...props} />;
        case editorBlocks.COLLAPSIBLE:
            return <RenderCollapsible block={data} {...props} />;
        case editorBlocks.TABLE:
            return <RenderTable block={data} {...props} />;
        case editorBlocks.ORDERED_LIST:
        case editorBlocks.UNORDERED_LIST:
            return <RenderList block={data} {...props} />;
        default:
            return null;
    }
};

export default RenderBlock;
