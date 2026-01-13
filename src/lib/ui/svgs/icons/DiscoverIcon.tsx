import { SVGProps } from "@/lib/types/prop.types";

const DiscoverIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" {...props}><path d="m22 12c0-5.52285-4.4772-10-10-10-5.52285 0-10 4.47715-10 10 0 5.5228 4.47715 10 10 10 5.5228 0 10-4.4772 10-10z" strokeWidth="1.5" /><g strokeLinecap="round" strokeLinejoin="round"><path d="m12.4014 8.29796 2.9199-.97331c.8862-.29541 1.3294-.44312 1.5633-.20921s.0862.67703-.2093 1.56327l-.9733 2.91989c-.5034 1.5102-.7551 2.2653-1.2966 2.8068s-1.2966.7932-2.8068 1.2966l-2.91989.9733c-.88624.2955-1.32936.4432-1.56327.2093s-.0862-.6771.20921-1.5633l.97331-2.9199c.5034-1.5102.7551-2.2653 1.29661-2.80683.54153-.54151 1.29663-.79321 2.80683-1.29661z" strokeWidth="1.5" /><path d="m12 12-.0064.0064" strokeWidth="2" /></g></g></svg>
  );
};

export default DiscoverIcon;
