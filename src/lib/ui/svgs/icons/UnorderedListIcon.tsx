import { SVGProps } from "@/types/prop.types";

const UnorderedListIcon = (props: SVGProps) => {
    return (
        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m15 4h6" /><path d="m15 15h6" /><path d="m15 9h6" /><path d="m15 20h6" /><circle cx="6.5" cy="6.5" r="3.5" /><circle cx="6.5" cy="17.5" r="3.5" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}><g fill="none"><circle cx="4.443" cy="5.081" r="1.331" fill="currentColor" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.123 5.08h11.765" /><circle cx="4.443" cy="12" r="1.331" fill="currentColor" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.123 12h11.765" /><circle cx="4.443" cy="18.919" r="1.331" fill="currentColor" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.123 18.92h11.765" /></g></svg>
    );
};

export default UnorderedListIcon;
