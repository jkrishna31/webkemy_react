import { SVGProps } from "@/lib/types/prop";

const SignatureIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M3 17q5-5 5-8c0-3-1-3-2-3S3.968 7.085 4 9c.034 2.048 1.658 4.877 2.5 6C8 17 9 17.5 10 16l2-3q.5 4 3 4c.53 0 2.639-2 3-2q.776 0 3 2" /></svg>
    // <!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m21 17l-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284M3 21h18" /></svg>
    // <!-- Icon from Huge Icons by Hugeicons - undefined -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M22 12.634c-4 3.512-4.572-2.013-6.65-1.617c-2.35.447-3.85 5.428-2.35 5.428s-.5-5.945-2.5-3.89s-2.64 4.74-4.265 2.748C-1.5 5.813 5-1.15 8.163 3.457C10.165 6.373 6.5 16.977 2 22m7-1h10" /></svg>
  );
};

export default SignatureIcon;
