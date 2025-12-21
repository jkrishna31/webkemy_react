{/* <svg xmlns="http://www.w3.org/2000/svg" width="3206" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" {...props}><path d="m16 20l-8-8l8-8" /></svg> */ }

import { SVGProps } from "@/lib/types/prop.types";

const ChevronLeftIcon = (props: SVGProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M16 4L8 12L16 20"></path>
        </svg>
    );
};

export default ChevronLeftIcon;
