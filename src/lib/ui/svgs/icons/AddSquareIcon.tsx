import { SVGProps } from "@/types/prop.types";

const AddSquareIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.861V17.14M17.14 12H6.86" /><rect width="18.5" height="18.5" x="2.75" y="2.75" rx="6" /></g></svg>
    );
};

export default AddSquareIcon;
