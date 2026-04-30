import { SVGProps } from "@/lib/types/prop";

const TodoListIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M13 5h8m-8 7h8m-8 7h8M3 17l2 2l4-4" /><rect width="6" height="6" x="3" y="4" rx="1" /></svg>
  );
};

export default TodoListIcon;
