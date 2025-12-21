import { SVGProps } from "@/lib/types/prop.types";

const CircleInfoIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none"><circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" /><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 11.813v5" /><circle cx="12" cy="8.438" r="1.25" fill="currentColor" /></g></svg>
    );
};

export default CircleInfoIcon;
