import { SVGProps } from "@/lib/types/prop";

const CornerFoldShape = (props: SVGProps) => {
  return (
    <svg
      width="159.63441mm"
      height="159.64574mm"
      viewBox="0 0 159.63441 159.64574"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.64583"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={6}
      {...props}
    >
      <path
        d="m 1.5505671,1.322915 c -0.078604,0 -0.1532696,0.014034 -0.2294434,0.022738 A 79.375,79.375 0 0 1 78.936541,80.697915 79.375,79.375 0 0 1 158.2888,158.3247 c 0.008,-0.074 0.0227,-0.14643 0.0227,-0.22273 V 3.2938541 c 4e-5,-1.0917586 -0.88713,-1.9709391 -1.98899,-1.9709391 z" />
    </svg>
  );
};

export default CornerFoldShape;
