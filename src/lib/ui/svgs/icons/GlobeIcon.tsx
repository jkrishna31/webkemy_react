import { SVGProps } from "@/lib/types/prop.types";

const GlobeIcon = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M21.25 12A9.25 9.25 0 0 0 12 2.75M21.25 12H2.75m18.5 0A9.25 9.25 0 0 1 12 21.25m0-18.5A9.25 9.25 0 0 0 2.75 12M12 2.75c-.5 0-4 4.141-4 9.25s3.5 9.25 4 9.25m0-18.5c.5 0 4 4.141 4 9.25s-3.5 9.25-4 9.25M2.75 12A9.25 9.25 0 0 0 12 21.25" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M22 12a10 10 0 1 1-20.001 0A10 10 0 0 1 22 12Z" /><path d="M16 12c0 1.313-.104 2.614-.305 3.827c-.2 1.213-.495 2.315-.867 3.244c-.371.929-.812 1.665-1.297 2.168c-.486.502-1.006.761-1.531.761s-1.045-.259-1.53-.761c-.486-.503-.927-1.24-1.298-2.168c-.372-.929-.667-2.03-.868-3.244A23.6 23.6 0 0 1 8 12c0-1.313.103-2.614.304-3.827s.496-2.315.868-3.244c.371-.929.812-1.665 1.297-2.168C10.955 2.26 11.475 2 12 2s1.045.259 1.53.761c.486.503.927 1.24 1.298 2.168c.372.929.667 2.03.867 3.244C15.897 9.386 16 10.687 16 12Z" /><path strokeLinecap="round" d="M2 12h20" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><g><circle cx="12" cy="12" r="10" /><path strokeLinejoin="round" d="M8 12c0 6 4 10 4 10s4-4 4-10s-4-10-4-10s-4 4-4 10Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 15H3m18-6H3" /></g></svg>
    );
};

export default GlobeIcon;
