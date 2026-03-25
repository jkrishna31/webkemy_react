import { SVGProps } from "@/lib/types/prop";

const QuoteMessageIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><g><path d="M3 20.29V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.961a2 2 0 0 0-1.561.75l-2.331 2.914A.6.6 0 0 1 3 20.29Z" /><path strokeLinecap="round" d="M10.5 10h-2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1zm0 0c0 1-1 2-2 3m8-3h-2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1zm0 0c0 1-1 2-2 3" /></g></svg>
  );
};

export default QuoteMessageIcon;
