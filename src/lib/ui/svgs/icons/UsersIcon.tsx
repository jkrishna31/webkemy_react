import { SVGProps } from "@/lib/types/prop.types";

const UsersIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" {...props}><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" /><path d="M32,120a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" /><circle cx="80" cy="168" r="32" /><circle cx="80" cy="64" r="32" /><circle cx="176" cy="168" r="32" /><circle cx="176" cy="64" r="32" /></svg>
  );
};

export default UsersIcon;
