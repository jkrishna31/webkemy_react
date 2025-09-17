import { SVGProps } from "@/types/prop.types";

{/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M5.636 18.364A9 9 0 1 0 3 12.004V14" /><path d="m1 12l2 2l2-2m6-4v5h5" /></svg> */ }

const HistoryIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.266 16.06a8.923 8.923 0 0 0 3.915 3.978 8.706 8.706 0 0 0 5.471.832 8.795 8.795 0 0 0 4.887-2.64 9.067 9.067 0 0 0 2.388-5.079 9.135 9.135 0 0 0-1.044-5.53 8.903 8.903 0 0 0-4.069-3.815 8.7 8.7 0 0 0-5.5-.608c-1.85.401-3.366 1.313-4.62 2.755-.151.16-.735.806-1.22 1.781M7.5 8l-3.609.72L3 5m9 4v4l3 2" /></svg>
    );
};

export default HistoryIcon;
