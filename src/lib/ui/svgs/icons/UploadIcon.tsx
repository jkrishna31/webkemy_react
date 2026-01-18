import { SVGProps } from "@/lib/types/prop.types";

const UploadIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="m8 8l4-4m0 0l4 4m-4-4v12m7 1v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17" /></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M12 16.349V3.87M6.118 9.132l4.821-4.821c.293-.293.677-.44 1.061-.44m5.882 5.261l-4.821-4.821A1.5 1.5 0 0 0 12 3.87m8.75 12.645v.935a3.3 3.3 0 0 1-3.3 3.3H6.55a3.3 3.3 0 0 1-3.3-3.3v-.935"/></svg>
  );
};

export default UploadIcon;
