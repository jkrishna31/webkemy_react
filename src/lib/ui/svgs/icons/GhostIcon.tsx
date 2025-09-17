import { SVGProps } from "@/types/prop.types";

const GhostIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" {...props}><path d="m20 10c0-4.41828-3.5817-8-8-8-4.41828 0-8 3.58172-8 8v10.4c0 .8837.71634 1.6 1.6 1.6s1.6-.7163 1.6-1.6v-.8c0-.8837.71634-1.6 1.6-1.6s1.6.7163 1.6 1.6v.8c0 .8837.7163 1.6 1.6 1.6s1.6-.7163 1.6-1.6v-.8c0-.8837.7163-1.6 1.6-1.6s1.6.7163 1.6 1.6v.8c0 .8837.7163 1.6 1.6 1.6s1.6-.7163 1.6-1.6z" strokeWidth="1.5" /><path d="m9.00896 10h-.00896m6 0h-.009" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
  );
};

export default GhostIcon;
