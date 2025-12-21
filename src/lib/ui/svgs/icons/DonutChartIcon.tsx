import { SVGProps } from "@/lib/types/prop.types";

const DonutChartIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" width="24" height="24" fill="none" stroke="currentColor" {...props}><path d="M19.43,19.43A10.5,10.5,0,1,1,12,1.5V7.23a4.77,4.77,0,1,0,3.38,8.15Z"></path><path d="M22.5,12a10.47,10.47,0,0,1-3.07,7.43l-4-4A4.79,4.79,0,0,0,16.77,12Z"></path><path d="M22.5,12H16.77A4.78,4.78,0,0,0,12,7.23V1.5A10.5,10.5,0,0,1,22.5,12Z"></path></svg>
  );
};

export default DonutChartIcon;
