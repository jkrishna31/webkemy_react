import { SVGProps } from "@/types/prop.types";

const UndoIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M4 7h11a5 5 0 0 1 0 10H8M4 7l3-3M4 7l3 3" /></svg>
    );
};

export default UndoIcon;
