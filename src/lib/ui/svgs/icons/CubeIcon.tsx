import { SVGProps } from "@/lib/types/prop.types";

const CubeIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M12 21c.28 0 .539-.127 1.058-.382l4.172-2.044C19.077 17.669 20 17.216 20 16.5v-9M12 21c-.28 0-.539-.127-1.058-.382L6.77 18.574C4.923 17.669 4 17.216 4 16.5v-9M12 21v-9" /><path d="M10.942 3.382C11.462 3.127 11.721 3 12 3c.28 0 .539.127 1.058.382l4.172 2.044C19.077 6.331 20 6.784 20 7.5s-.923 1.169-2.77 2.074l-4.172 2.044c-.52.255-.779.382-1.058.382c-.28 0-.539-.127-1.058-.382L6.77 9.574C4.923 8.669 4 8.216 4 7.5s.923-1.169 2.77-2.074z" /></g></svg>
  );
};

export default CubeIcon;
