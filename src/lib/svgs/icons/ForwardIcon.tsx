import { SVGProps } from "@/lib/types/prop";

const ForwardIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Akar Icons by Arturo Wibawa - https://github.com/artcoholic/akar-icons/blob/master/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m16 5l5 5l-5 5" /><path d="M21 10h-8C7.477 10 3 14.477 3 20v1" /></svg>
    // <!-- Icon from ProIcons by ProCode - https://github.com/ProCode-Software/proicons/blob/main/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M4.25 18.219c0-2.352 0-3.527.383-4.455a5.06 5.06 0 0 1 2.743-2.743c.928-.383 2.103-.383 4.455-.383h8.298m-4.236-4.857l3.796 3.796c.293.293.44.677.44 1.061m-4.236 4.857l3.796-3.796c.293-.293.44-.677.44-1.061" /></svg>
  );
};

export default ForwardIcon;
