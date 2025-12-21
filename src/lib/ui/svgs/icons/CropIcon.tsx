{/* <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m4 2v2m18 16h-2m-3.5 0h-6.5c-2.82843 0-4.24264 0-5.12132-.8787s-.87868-2.2929-.87868-5.1213v-6.5" /><path d="m20 22v-10c0-3.77123 0-5.65685-1.1716-6.82842-1.1715-1.17158-3.0572-1.17158-6.8284-1.17158h-10" /></svg> */ }

import { SVGProps } from "@/lib/types/prop.types";

const CropIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2v14a2 2 0 0 0 2 2h14" /><path d="M18 22V8a2 2 0 0 0-2-2H2" /></svg>
  );
};

export default CropIcon;
