import { SVGProps } from "@/lib/types/prop.types";

const OrderedListIcon = (props: SVGProps) => {
    return (
        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" {...props}><path d="m11 6h10" /><path d="m11 12h10" /><path d="m11 18h10" /><g strokeLinejoin="round"><path d="m3 15h1.5c.27879 0 .41819 0 .53411.0231.47603.0946.84814.4668.94283.9428.02306.1159.02306.2553.02306.5341s0 .4182-.02306.5341c-.09469.476-.4668.8482-.94283.9428-.11592.0231-.25532.0231-.53411.0231s-.41819 0-.53411.0231c-.47603.0946-.84814.4668-.94283.9428-.02306.1159-.02306.2553-.02306.5341v.9c0 .2828 0 .4243.08787.5121.08787.0879.22929.0879.51213.0879h2.4" /><path d="m3 3h1.2c.16569 0 .3.13431.3.3v5.7m0 0h-1.5m1.5 0h1.5" /></g></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 6h9m-9 6h9m-8 6h8M4 16a2 2 0 1 1 4 0c0 .591-.5 1-1 1.5L4 20h4M6 10V4L4 6" /></svg>
    );
};

export default OrderedListIcon;
