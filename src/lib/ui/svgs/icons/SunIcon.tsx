import { SVGProps } from "@/lib/types/prop.types";

const SunIcon = (props: SVGProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-4-9v2m0 14.004v2M5 12H3m18 0h-2m0-7l-2 2M5 5l2 2m0 10l-2 2m14 0l-2-2" /></svg>
	);
};

export default SunIcon;
