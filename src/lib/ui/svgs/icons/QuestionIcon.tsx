import { SVGProps } from "@/types/prop.types";

const QuestionIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" {...props}>
            <path strokeMiterlimit="10" d="M9.008 8.84a3.185 3.185 0 0 1 3.471-1.806a3.09 3.09 0 0 1 2.265 1.614a2.682 2.682 0 0 1-1.562 3.689a1.98 1.98 0 0 0-1.276 1.787v.738" />
            <path strokeLinejoin="round" d="M11.881 17.424h.008" />
            <path strokeLinejoin="round" d="M12 21.5a9.5 9.5 0 1 0 0-19a9.5 9.5 0 0 0 0 19" />
        </svg>
    );
};

export default QuestionIcon;
