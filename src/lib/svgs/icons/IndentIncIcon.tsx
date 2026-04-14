import { SVGProps } from "@/lib/types/prop";

const IndentIncIcon = (props: SVGProps) => {
    return (
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12H11" /><path d="M21 18H11" /><path d="M21 6H11" /><path d="m3 8 4 4-4 4" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M21 5H11m10 7H11m10 7H11M3 8l4 4l-4 4" /></svg>
        // <!-- Icon from ProIcons by ProCode - https://github.com/ProCode-Software/proicons/blob/main/LICENSE -->
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" {...props}><path d="M6.75 18.75h13.5M6.75 5.25h13.5M10.75 12h9.5" /><path strokeLinejoin="round" d="m3.75 9l3 3l-3 3" /></svg>
    );
};

export default IndentIncIcon;
