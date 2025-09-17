{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M8.5 14.5h7m-7-5H12m2.17 11.39c4.184-.277 7.516-3.657 7.79-7.9c.053-.83.053-1.69 0-2.52c-.274-4.242-3.606-7.62-7.79-7.899a33 33 0 0 0-4.34 0c-4.184.278-7.516 3.657-7.79 7.9a20 20 0 0 0 0 2.52c.1 1.545.783 2.976 1.588 4.184c.467.845.159 1.9-.328 2.823c-.35.665-.526.997-.385 1.237c.14.24.455.248 1.084.263c1.245.03 2.084-.322 2.75-.813c.377-.279.566-.418.696-.434s.387.09.899.3c.46.19.995.307 1.485.34c1.425.094 2.914.094 4.342 0" color="currentColor" /></svg> */ }

import { SVGProps } from "@/types/prop.types";

const CommentIcon = (props: SVGProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M7 9H17M7 13H11M22 12C22 17.5228 17.5228 22 12 22H3.10288C2.67314 22 2.44361 21.4937 2.72681 21.1705L4.73812 18.875C3.04094 17.0829 2 14.663 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" ></path>
        </svg>
    );
};

export default CommentIcon;
