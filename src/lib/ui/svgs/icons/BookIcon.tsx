import { SVGProps } from "@/lib/types/prop.types";

const BookIcon = (props: SVGProps) => {
    return (
        <svg
            width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            {...props}
        >
            <path d="M3.5 18V7C3.5 3 4.5 2 8.5 2H15.5C19.5 2 20.5 3 20.5 7V17C20.5 17.14 20.5 17.28 20.49 17.42" />
            <path d="M6.35 15H20.5V18.5C20.5 20.43 18.93 22 17 22H7C5.07 22 3.5 20.43 3.5 18.5V17.85C3.5 16.28 4.78 15 6.35 15Z" />
            <path d="M8 7H16" />
            <path d="M8 10.5H13" />
        </svg>
    );
};

export default BookIcon;
