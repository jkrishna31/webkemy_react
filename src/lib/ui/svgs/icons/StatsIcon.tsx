import { SVGProps } from "@/lib/types/prop.types";

const StatsIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 9h4v12H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2m6-6h2a2 2 0 0 1 2 2v16H9V5a2 2 0 0 1 2-2m4 4h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4z" /></svg>
    );
};

export default StatsIcon;
