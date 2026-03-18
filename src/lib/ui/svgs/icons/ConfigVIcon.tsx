import { SVGProps } from "@/lib/types/prop.types";

const ConfigVIcon = (props: SVGProps) => {
    return (
        // <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="24"
        //     height="24"
        //     viewBox="0 0 24 24"
        //     fill="none"
        //     stroke="currentColor"
        //     strokeWidth="2"
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     {...props}
        // >
        //     <line x1="4" y1="21" x2="4" y2="14" />
        //     <line x1="4" y1="10" x2="4" y2="3" />
        //     <line x1="12" y1="21" x2="12" y2="12" />
        //     <line x1="12" y1="8" x2="12" y2="3" />
        //     <line x1="20" y1="21" x2="20" y2="16" />
        //     <line x1="20" y1="12" x2="20" y2="3" />
        //     <line x1="1" y1="14" x2="7" y2="14" />
        //     <line x1="9" y1="8" x2="15" y2="8" />
        //     <line x1="17" y1="16" x2="23" y2="16" />
        // </svg>
        // <!-- Icon from Myna UI Icons by Praveen Juge - https://github.com/praveenjuge/mynaui-icons/blob/main/LICENSE -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M5 3v3m-2 4.25h4M5 11v10m7-4v4m-2-7.75h4M12 3v10m7-10v3m-2 4.25h4M19 11v10" /></svg>
    );
};

export default ConfigVIcon;
