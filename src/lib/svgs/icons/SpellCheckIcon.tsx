import { SVGProps } from "@/lib/types/prop";

const SpellCheckIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 15v-7.5a3.5 3.5 0 0 1 7 0v7.5" /><path d="M5 10h7" /><path d="M10 18l3 3l7 -7" /></svg>
  );
};

export default SpellCheckIcon;
