import { SVGProps } from "@/lib/types/prop.types";

const MoveIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2v20" /><path d="m15 19-3 3-3-3" /><path d="m19 9 3 3-3 3" /><path d="M2 12h20" /><path d="m5 9-3 3 3 3" /><path d="m9 5 3-3 3 3" /></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9.005V2.75M9 5.324l2.273-2.273c.201-.2.464-.301.727-.301m3 2.574l-2.273-2.273c-.2-.2-.464-.301-.727-.301M14.995 12h6.255m-2.574-3l2.273 2.273c.2.201.301.464.301.727m-2.574 3l2.273-2.273c.2-.2.301-.464.301-.727M12 14.995v6.255m-3-2.574l2.273 2.273c.201.2.464.301.727.301m3-2.574l-2.273 2.273c-.2.2-.464.301-.727.301M9.005 12H2.75m2.574-3l-2.273 2.273c-.2.201-.301.464-.301.727m2.574 3l-2.273-2.273c-.2-.2-.301-.464-.301-.727" /></svg>
  );
};

export default MoveIcon;
