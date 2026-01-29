import { SVGProps } from "@/lib/types/prop.types";

const RowAddUpIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    //   <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //   <path d="M4 18v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z" />
    //   <path d="M12 9v-4" />
    //   <line x1="10" y1="7" x2="14" y2="7" />
    // </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><g><path strokeLinecap="round" strokeLinejoin="round" d="M18 2.813c.889.201 1.564.533 2.109 1.078C21.5 5.28 21.5 7.52 21.5 11.999s0 6.718-1.391 8.11c-1.392 1.39-3.63 1.39-8.109 1.39c-4.478 0-6.718 0-8.109-1.39C2.5 18.716 2.5 16.477 2.5 11.998s0-6.717 1.391-8.108c.545-.545 1.22-.877 2.109-1.078" /><path strokeLinecap="round" strokeLinejoin="round" d="m9 5.5l3-3l3 3m-3-2v7" /><path d="M2.5 15h19m-13 6.5V15m7 6.5V15" /></g></svg>
  );
};

export default RowAddUpIcon;
