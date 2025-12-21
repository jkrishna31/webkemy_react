import { SVGProps } from "@/lib/types/prop.types";

const UnderlineIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M6 4v6a6 6 0 0 0 12 0V4M4 20h16" /></svg>
    );
};

export default UnderlineIcon;
