import { SVGProps } from "@/lib/types/prop.types";

const KanbanIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M5 3v14m7-14v8m7-8v18" /></svg>
  );
};

export default KanbanIcon;
