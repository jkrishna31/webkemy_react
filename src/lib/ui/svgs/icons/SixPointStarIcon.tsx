import { SVGProps } from "@/lib/types/prop.types";

const SixPointStarIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" {...props}><g fill="none"><path fill="currentColor" d="m24 4l17.32 30H6.68z" /><path fill="currentColor" d="m24 44l17.32-30H6.68z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="m24 4l17.32 30H6.68z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="m24 44l17.32-30H6.68z" /></g></svg>
    );
};

export default SixPointStarIcon;
