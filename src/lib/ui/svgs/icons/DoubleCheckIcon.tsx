import { SVGProps } from "@/lib/types/prop.types";

const DoubleCheckIcon = (props: SVGProps) => {
    return (
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m4 17l5 5l12-12m-5 10l2 2l12-12" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="3242" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" {...props}><path d="m1.5 12.5l4.076 4.076a.6.6 0 0 0 .848 0L9 14m7-7l-4 4" /><path d="m7 12l4.576 4.576a.6.6 0 0 0 .848 0L22 7" /></svg>
    );
};

export default DoubleCheckIcon;
