import { SVGProps } from "@/types/prop.types";

const ArrowUpIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 3h14" /><path d="m18 13-6-6-6 6" /><path d="M12 7v14" /></svg>
    );
};

export default ArrowUpIcon;
