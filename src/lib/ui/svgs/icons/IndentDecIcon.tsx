import { SVGProps } from "@/lib/types/prop.types";

const IndentDecIcon = (props: SVGProps) => {
    return (
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12H11" /><path d="M21 18H11" /><path d="M21 6H11" /><path d="m7 8-4 4 4 4" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M21 5H11m10 7H11m10 7H11M7 8l-4 4l4 4" /></svg>
    );
};

export default IndentDecIcon;
