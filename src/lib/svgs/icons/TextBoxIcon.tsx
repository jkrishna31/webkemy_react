import { SVGProps } from "@/lib/types/prop";

const TextBoxIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" {...props}><path strokeLinecap="round" d="M12 8v8m0-8H8m4 0h4" /><path d="M21 13.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5.5m18-3V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5.5m16.5 3v-3h3v3zm-18 0v-3h3v3z" /></svg>
  );
};

export default TextBoxIcon;
