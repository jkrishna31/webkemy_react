import { SVGProps } from "@/lib/types/prop";

const RoundBracketsIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Meteor Icons by zkreations - https://github.com/zkreations/icons/blob/main/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M8 4a9 9 0 0 0 0 16m8 0a9 9 0 0 0 0-16" /></svg>
    // <!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M7 4a12.25 12.25 0 0 0 0 16M17 4a12.25 12.25 0 0 1 0 16" /></svg>
  );
};

export default RoundBracketsIcon;
