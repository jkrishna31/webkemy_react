import { SVGProps } from "@/lib/types/prop.types";

const LogoutIcon = (props: SVGProps) => {
    return (
        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" {...props}><path d="m14 3.09502c-.457-.06261-.9245-.09502-1.4-.09502-5.30193 0-9.6 4.02944-9.6 9 0 4.9706 4.29807 9 9.6 9 .4755 0 .943-.0324 1.4-.095" /><path d="m21 12h-10m10 0c0-.7002-1.9943-2.00847-2.5-2.5m2.5 2.5c0 .7002-1.9943 2.0085-2.5 2.5" strokeLinejoin="round" /></svg>
    );
};

export default LogoutIcon;
