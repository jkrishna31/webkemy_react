import { SVGProps } from "@/lib/types/prop.types";

const MoonIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M21 12.808c-.5 5.347-5.849 9.14-11.107 7.983C-.078 18.6 1.15 3.909 11.11 3C6.395 9.296 14.619 17.462 21 12.808" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M11.578 3.512a6.307 6.307 0 0 0 8.91 8.91a.45.45 0 0 1 .466-.095c.176.067.29.24.275.428A9.255 9.255 0 1 1 5.461 5.45a9.22 9.22 0 0 1 5.784-2.68a.42.42 0 0 1 .428.275c.06.16.02.34-.095.466Z" /></svg>
    );
};

export default MoonIcon;
