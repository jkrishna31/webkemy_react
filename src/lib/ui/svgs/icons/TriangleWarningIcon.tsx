import { SVGProps } from "@/lib/types/prop.types";

const TriangleWarningIcon = (props: SVGProps) => {
    return (
        <svg
            width="436.53"
            height="411.91656"
            viewBox="0 0 436.53 411.91656"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M 47.834998,395.91658 H 388.695 a 32,32 0 0 0 28.17,-47.17 L 246.445,32.246578 c -12.09,-22.4399999 -44.27,-22.4399999 -56.36,0 L 19.664998,348.74658 a 32,32 0 0 0 28.17,47.17 z"
                style={{ fill: "none", stroke: "currentColor", strokeWidth: "32px", strokeLinecap: "round", strokeLinejoin: "round", strokeOpacity: 1 }}
            />
            <path
                d="m 212.525,145.05658 5.74,122 5.73,-121.95 a 5.74,5.74 0 0 0 -5.79,-6 v 0 a 5.74,5.74 0 0 0 -5.68,5.95 z"
                style={{ fill: "none", stroke: "currentColor", strokeWidth: "32px", strokeLinecap: "round", strokeLinejoin: "round", strokeOpacity: 1 }}
            />
            <path
                d="m 218.265,346.91658 a 20,20 0 1 1 20,-20 20,20 0 0 1 -20,20 z"
                style={{ stroke: "none", strokeOpacity: 1, fill: "currentColor", fillOpacity: 1 }}
            />
        </svg>
        // <svg
        //     viewBox="0 0 223.99174 199.99269"
        //     version="1.1"
        //     width="223.99174"
        //     height="199.99269"
        //     xmlns="http://www.w3.org/2000/svg"
        //     {...props}
        // >
        //     <path
        //         d="M 103.97644,120.00003 V 72.000033 a 8,8 0 0 1 16,0 v 47.999997 a 8,8 0 0 1 -16,0 z m 116.76758,67.981 a 23.75438,23.75438 0 0 1 -20.791,12.01123 H 23.999881 A 23.99994,23.99994 0 0 1 3.228441,163.96976 L 91.204961,11.977083 a 24.00024,24.00024 0 0 1 41.542999,0 l 87.97657,151.992187 a 23.75354,23.75354 0 0 1 0.0195,24.01176 z M 206.87683,171.98445 118.90027,19.992223 a 8.00025,8.00025 0 0 0 -13.84766,0 v 0 L 17.076051,171.98441 a 8.00079,8.00079 0 0 0 6.92383,12.00781 H 199.953 a 8.00079,8.00079 0 0 0 6.92383,-12.00781 z m -94.90039,-27.98442 a 12,12 0 1 0 12,12 12.01343,12.01343 0 0 0 -12,-12 z"
        //         style={{ fill: "currentColor", fillOpacity: 1 }}
        //     />
        // </svg>
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none"><path stroke="currentColor" strokeWidth="1.5" d="M5.732 20.5c-2.29 0-3.723-2.498-2.581-4.5L9.419 5.006c1.144-2.008 4.018-2.008 5.163 0L20.849 16c1.142 2.002-.291 4.5-2.581 4.5z"/><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 13.375V9"/><circle cx="1.25" cy="1.25" r="1.25" fill="currentColor" transform="matrix(1 0 0 -1 10.75 17.938)"/></g></svg>
    );
};

export default TriangleWarningIcon;
