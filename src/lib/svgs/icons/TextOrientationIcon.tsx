import { SVGProps } from "@/lib/types/prop";

const TextOrientationIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m9 15l-5-5C2.633 8.633 2.633 6.367 4 5s3.633-1.367 5 0l5 5m-8.5 1.5l5-5M21 12l-9 9m9-9v4m0-4h-4" /></svg>
  );
};

export default TextOrientationIcon;
