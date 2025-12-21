import { SVGProps } from "@/lib/types/prop.types";

const ScheduleIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 20H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4v3" /><path d="M8 2v2" /><path d="M15 2v2" /><path d="M2 8h19" /><path d="M18.5 15.643l-1.5 1.5" /><circle cx="17" cy="17" r="5" /></svg>
  );
};

export default ScheduleIcon;
