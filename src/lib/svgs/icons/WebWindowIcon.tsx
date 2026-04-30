import { SVGProps } from "@/lib/types/prop";

const WebWindowIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 7h1" /><path d="M2 17.714V6.286C2 5.023 2.995 4 4.222 4h15.556C21.005 4 22 5.023 22 6.286v11.428C22 18.977 21.005 20 19.778 20H4.222C2.995 20 2 18.977 2 17.714Z" /></svg>
    // <!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><g><rect width="20" height="16" x="2" y="4" rx="2" /><path d="M6 8h.01M10 8h.01M14 8h.01" /></g></svg>
  );
};

export default WebWindowIcon;
