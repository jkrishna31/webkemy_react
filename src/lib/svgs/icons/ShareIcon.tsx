import { SVGProps } from "@/lib/types/prop";

const ShareIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg>
        // <!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ -->
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" {...props}><path d="M22 13.998c-.029 3.414-.218 5.296-1.46 6.537C19.076 22 16.718 22 12.003 22s-7.073 0-8.538-1.465S2 16.713 2 11.997C2 7.282 2 4.924 3.465 3.46C4.706 2.218 6.588 2.029 10.002 2" /><path strokeLinejoin="round" d="M22 7h-8c-1.818 0-2.913.892-3.32 1.3q-.187.19-.19.19q0 .003-.19.19C9.892 9.087 9 10.182 9 12v3m13-8l-5-5m5 5l-5 5" /></svg>
    );
};

export default ShareIcon;
