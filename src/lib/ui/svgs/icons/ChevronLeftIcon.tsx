import { SVGProps } from "@/lib/types/prop.types";

const ChevronLeftIcon = (props: SVGProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M16 4L8 12L16 20"></path>
        </svg>
    );
};

export default ChevronLeftIcon;
