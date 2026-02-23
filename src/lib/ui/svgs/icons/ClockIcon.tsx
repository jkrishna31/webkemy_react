import { SVGProps } from "@/lib/types/prop.types";

const ClockIcon = (props: SVGProps) => {
    return (
        // <svg
        //     width="20"
        //     height="20"
        //     focusable="false"
        //     viewBox="0 0 12 12"
        //     version="1.1"
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="none"
        //     stroke="currentColor"
        //     {...props}
        // >
        //     <circle
        //         cx="6"
        //         cy="6"
        //         id="circle2"
        //         r="5.5" />
        //     <path
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         d="M 5.5,3 V 6.5 L 8,8.3453285"
        //     />
        // </svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><g><path d="M12 6v6l2.5 4" /><path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0" /></g></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><g><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12.008 10.508a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m0 0V7m3.007 8.02l-1.949-1.948" /></g></svg>
    );
};

export default ClockIcon;
