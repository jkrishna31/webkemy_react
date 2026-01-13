import { SVGProps } from "@/lib/types/prop.types";

const ExpandIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" {...props}><path d="M2.5 4L5.6.9c.2-.2.5-.2.7 0L9.5 4m-7 4l3.1 3.1c.2.2.5.2.7 0L9.5 8" /></svg>
  );
};

export default ExpandIcon;
