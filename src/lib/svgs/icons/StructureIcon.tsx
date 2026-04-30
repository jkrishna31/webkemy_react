import { SVGProps } from "@/lib/types/prop";

const StructureIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Huge Icons by Hugeicons - undefined -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M2 5c0-2.482.518-3 3-3h2c2.482 0 3 .518 3 3s-.518 3-3 3H5c-2.482 0-3-.518-3-3Zm13 4c0-2.482.453-3 2.625-3h1.75C21.547 6 22 6.518 22 9s-.453 3-2.625 3h-1.75C15.453 12 15 11.482 15 9Zm-2 10c0-2.482.518-3 3-3h2c2.482 0 3 .518 3 3s-.518 3-3 3h-2c-2.482 0-3-.518-3-3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="m15 7l-5-2l3.571 11" /></svg>
    // <!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M8 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0Zm14 0a3 3 0 1 1-6 0a3 3 0 0 1 6 0ZM8 19a3 3 0 1 1-6 0a3 3 0 0 1 6 0Zm14 0a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" /><path strokeLinecap="round" d="M8 19h8M8 5h8m3 11V8M5 16V8" /></svg>
  );
};

export default StructureIcon;
