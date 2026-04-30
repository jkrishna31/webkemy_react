import { SVGProps } from "@/lib/types/prop";

const TextSizeIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7v-2h13v2" /><path d="M10 5v14" /><path d="M12 19h-4" /><path d="M15 13v-1h6v1" /><path d="M18 12v7" /><path d="M17 19h2" /></svg>
    // <!-- Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M3 7V5h14v2m-7-2v14m0 0h2m-2 0H8m5-5v-2h8v2m-4-2v7m0 0h-1.5m1.5 0h1.5" /></svg>
  );
};

export default TextSizeIcon;
