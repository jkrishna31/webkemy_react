import { SVGProps } from "@/lib/types/prop.types";

const ThemeIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}><path fill="currentColor" d="M2.75 12A9.25 9.25 0 0 0 12 21.25V2.75A9.25 9.25 0 0 0 2.75 12" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21.25a9.25 9.25 0 0 0 0-18.5m0 18.5a9.25 9.25 0 0 1 0-18.5m0 18.5V2.75" /></svg>
    );
};

export default ThemeIcon;
