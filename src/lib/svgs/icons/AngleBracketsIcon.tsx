import { SVGProps } from "@/lib/types/prop";

const AngleBracketsIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Meteor Icons by zkreations - https://github.com/zkreations/icons/blob/main/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m8 20l-5-8l5-8m8 16l5-8l-5-8" /></svg>
    // <!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m8 4l-5 8l5 8m8-16l5 8l-5 8" /></svg>
  );
};

export default AngleBracketsIcon;
