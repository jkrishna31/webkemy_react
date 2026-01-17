import { SVGProps } from "@/lib/types/prop.types";

const CrossIcon = (props: SVGProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 5L19 19M5 19L19 5" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7" /></svg>
    );
};

export default CrossIcon;
