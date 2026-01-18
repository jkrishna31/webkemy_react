import { SVGProps } from "@/lib/types/prop.types";

const PinIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 17v5" /><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" /></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m7.77 16.233l-4.02 4.02M14.976 3.336l5.69 5.691a2 2 0 0 1-.698 3.282L16.595 13.6a4 4 0 0 0-2.426 2.674l-.689 2.5a1.5 1.5 0 0 1-2.507.662L4.568 13.03a1.5 1.5 0 0 1 .662-2.507l2.5-.688a4 4 0 0 0 2.673-2.427l1.291-3.372a2 2 0 0 1 3.282-.7" /></svg>
  );
};

export default PinIcon;
