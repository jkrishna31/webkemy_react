import { SVGProps } from "@/lib/types/prop.types";

const MenuIcon = (props: SVGProps) => {
    return (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" {...props}><g><circle cx="17.75" cy="6.25" r="4.25" /><circle cx="6.25" cy="6.25" r="4.25" /><circle cx="17.75" cy="17.75" r="4.25" /><circle cx="6.25" cy="17.75" r="4.25" /></g></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><g><circle cx="17.75" cy="6.25" r="4.25" /><circle cx="6.25" cy="6.25" r="4.25" /><circle cx="17.75" cy="17.75" r="4.25" /><circle cx="6.25" cy="17.75" r="4.25" /></g></svg>
    );
};

export default MenuIcon;
