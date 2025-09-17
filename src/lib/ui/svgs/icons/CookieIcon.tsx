import { SVGProps } from "@/types/prop.types";

const CookieIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" /><path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" /></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.076 10.535a2.75 2.75 0 0 0 3.89 0v0c.127-.128.362-.076.393.102a9.25 9.25 0 0 1-15.65 8.154a9.25 9.25 0 0 1 8.154-15.65c.178.031.23.266.102.394v0a2.75 2.75 0 0 0 2.333 4.667a2.75 2.75 0 0 0 .778 2.333" /><circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" /><circle cx="7.5" cy="9.5" r="1.25" fill="currentColor" /><circle cx="12.5" cy="12.5" r="1.25" fill="currentColor" /><circle cx="15.5" cy="16.5" r="1.25" fill="currentColor" /></g></svg>
  );
};

export default CookieIcon;
