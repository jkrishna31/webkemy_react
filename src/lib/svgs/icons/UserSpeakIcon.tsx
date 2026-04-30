import { SVGProps } from "@/lib/types/prop";

const UserSpeakIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><circle cx="10" cy="6" r="4" /><path d="M18 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S5.582 13 10 13s8 2.015 8 4.5Z" /><path strokeLinecap="round" d="M19 2s2 1.2 2 4s-2 4-2 4m-2-6s1 .6 1 2s-1 2-1 2" /></svg>
    // <!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><circle cx="10" cy="6" r="4" /><ellipse cx="10" cy="17" rx="7" ry="4" /><path strokeLinecap="round" d="M19 2s2 1.2 2 4s-2 4-2 4m-2-6s1 .6 1 2s-1 2-1 2" /></svg>
  );
};

export default UserSpeakIcon;
