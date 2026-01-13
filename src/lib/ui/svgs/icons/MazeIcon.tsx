import { SVGProps } from "@/lib/types/prop.types";

const MazeIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" {...props}><g strokeLinecap="round"><path d="m14 2.5v4.5c0 1.88562 0 2.82843.5858 3.4142.5858.5858 1.5286.5858 3.4142.5858" /><path d="m21.5 15h-6.5m-5 0h5m0 0v6.5" /><path d="m2.5 10h2.5c1.88562 0 2.82843 0 3.41421-.58579.58579-.58578.58579-1.52859.58579-3.41421" /><path d="m2.5 15h3.5" /></g><path d="m2.5 12c0-4.47834 0-6.71751 1.39124-8.10876 1.39125-1.39124 3.63042-1.39124 8.10876-1.39124 4.4783 0 6.7175 0 8.1088 1.39124 1.3912 1.39125 1.3912 3.63042 1.3912 8.10876 0 4.4783 0 6.7175-1.3912 8.1088-1.3913 1.3912-3.6305 1.3912-8.1088 1.3912-4.47834 0-6.71751 0-8.10876-1.3912-1.39124-1.3913-1.39124-3.6305-1.39124-8.1088z" /></g></svg>
  );
};

export default MazeIcon;
