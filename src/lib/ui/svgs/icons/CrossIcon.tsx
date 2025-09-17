import { SVGProps } from "@/types/prop.types";

const CrossIcon = (props: SVGProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M5 5L19 19M5 19L19 5"></path>
        </svg>
    );
};

export default CrossIcon;
