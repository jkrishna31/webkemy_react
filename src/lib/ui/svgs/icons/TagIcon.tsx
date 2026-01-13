import { SVGProps } from "@/lib/types/prop.types";

const TagIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="round" {...props}><g><path strokeLinecap="round" strokeWidth="1.5" d="M12.586 4.586A2 2 0 0 0 11.172 4H4v7.172a2 2 0 0 0 .586 1.414l7 7a2 2 0 0 0 2.828 0l5.172-5.172a2 2 0 0 0 0-2.828z" /><path strokeWidth="2.25" d="M9 9h.01v.01H9z" /></g></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></svg>
  );
};

export default TagIcon;
