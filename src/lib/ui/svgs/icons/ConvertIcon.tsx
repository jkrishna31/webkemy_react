import { SVGProps } from "@/types/prop.types";

const ConvertIcon = (props: SVGProps) => {
    return (
        <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            {...props}
        >
            <path d="M12.0051 21.9843C17.5165 21.9843 21.9843 17.5165 21.9843 12.0051C21.9843 6.49372 17.5165 2.02588 12.0051 2.02588C6.49372 2.02588 2.02588 6.49372 2.02588 12.0051C2.02588 17.5165 6.49372 21.9843 12.0051 21.9843Z" />
            <path d="M6.13721 4.02173L14.3002 12.2047L14.3202 7.66414" />
            <path d="M17.8629 19.9784L9.69989 11.8054L9.67993 16.336" />
        </svg>
    );
};

export default ConvertIcon;
