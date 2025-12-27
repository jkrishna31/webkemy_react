import { SVGProps } from "@/lib/types/prop.types";

const PanelTopCloseIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="m9 16 3-3 3 3" /></svg>
    );
};

export default PanelTopCloseIcon;
