import { SVGProps } from "@/lib/types/prop.types";

const RowAddDownIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    //   <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //   <path d="M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1z" />
    //   <line x1="12" y1="15" x2="12" y2="19" />
    //   <line x1="14" y1="17" x2="10" y2="17" />
    // </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><g><path strokeLinecap="round" strokeLinejoin="round" d="M18 21.187c.889-.202 1.564-.533 2.109-1.078C21.5 18.717 21.5 16.479 21.5 12c0-4.478 0-6.718-1.391-8.109S16.479 2.5 12 2.5c-4.478 0-6.718 0-8.109 1.391S2.5 7.521 2.5 12c0 4.478 0 6.718 1.391 8.109c.545.545 1.22.876 2.109 1.078" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5v7m-3-2l3 3l3-3" /><path d="M2.5 9h19m-13-6.5V9m7-6.5V9" /></g></svg>
  );
};

export default RowAddDownIcon;
