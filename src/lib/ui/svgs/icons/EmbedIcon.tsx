import { SVGProps } from "@/lib/types/prop.types";

const EmbedIcon = (props: SVGProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20" height="20"
            viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            {...props}
        >
            <path d="m20.777 13.345l-7.297 8.027a2 2 0 0 1-2.96 0l-7.297-8.027a2 2 0 0 1 0-2.69l7.297-8.027a2 2 0 0 1 2.96 0l7.297 8.027a2 2 0 0 1 0 2.69M9 12h3m3 0h-3m0 0V9m0 3v3" />
        </svg>
    );
};

export default EmbedIcon;
