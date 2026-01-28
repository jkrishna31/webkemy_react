import { SVGProps } from "@/lib/types/prop.types";

const UnorderedListIcon = (props: SVGProps) => {
    return (
        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m15 4h6" /><path d="m15 15h6" /><path d="m15 9h6" /><path d="m15 20h6" /><circle cx="6.5" cy="6.5" r="3.5" /><circle cx="6.5" cy="17.5" r="3.5" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" {...props}><path d="M9 5h12M3 5h2m4 7h12M3 12h2m4 7h12M3 19h2" /></svg>
    );
};

export default UnorderedListIcon;
