import { SVGProps } from "@/types/prop.types";

const RepostIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16" /><path d="M2 12C2 6 6.39 2 11.806 2 16.209 2 19.76 4.335 21 8" /><path d="M7 17l-4-1-1 4" /><path d="M17 7l4 1 1-4" /></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M3 12a9 9 0 0 1 16-5.658" /><path d="M19.5 3v4h-4m5.5 5a9 9 0 0 1-16 5.657" /><path d="M4.5 21v-4h4" /></g></svg>
  );
};

export default RepostIcon;
